import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const configureWebSockets = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  let newsWebSocket = null; // Track the WebSocket connection

  // Function to establish the WebSocket connection
  const connectToNewsWebSocket = () => {
    newsWebSocket = new WebSocket(
      "wss://stream.data.alpaca.markets/v1beta1/news"
    );

    newsWebSocket.onopen = () => {
      console.log("Connected to the news WebSocket.");

      const authMessage = JSON.stringify({
        action: process.env.ALPACA_ACTION,
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
      });
      newsWebSocket.send(authMessage);

      const subscriptionMessage = JSON.stringify({
        action: "subscribe",
        news: ["*"],
      });
      newsWebSocket.send(subscriptionMessage);
    };

    newsWebSocket.onmessage = (event) => {
      const newsData = JSON.parse(event.data);
      console.log(`New data arrived: ${JSON.stringify(newsData)}`);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newsData));
        }
      });
    };

    newsWebSocket.onerror = (error) => {
      console.error("WebSocket error:", error);

      // Perform error handling based on the error type
      if (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT") {
        // Retry the connection after a delay
        console.log("Retrying connection in 5 seconds...");
        setTimeout(() => {
          connectToNewsWebSocket();
        }, 5000);
      } else {
        // Handle other error scenarios accordingly
        // For example, close the existing connection and perform recovery actions
        console.log(
          "WebSocket connection encountered an error. Closing the connection."
        );
        newsWebSocket.close();

        // Additional recovery logic here...
      }
    };

    newsWebSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);

      // Perform recovery actions if needed
      // For example, attempt to reconnect
      connectToNewsWebSocket();
    };
  };

  // Establish the initial WebSocket connection
  connectToNewsWebSocket();

  // Start the server
  const port = process.env.WSS_PORT || 8080;
  server.listen(port, () => {
    console.log(`wss server listening on port ${port}`);
  });
};

export default configureWebSockets;
