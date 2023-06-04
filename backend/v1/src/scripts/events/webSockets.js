import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import NewsService from "../../services/NewsService.js";
import ScrappingHelper from "../utils/helpers/ScrappingHelper.js";
const configureWebSockets = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  let newsWebSocket = null; // Track the WebSocket connection

  // Function to establish the WebSocket connection
  const connectToNewsWebSocket = () => {
    newsWebSocket = new WebSocket(process.env.ALPACA_WSS_STREAM_URL);

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

    newsWebSocket.onmessage = async (event) => {
      try {
        const newsData = JSON.parse(event.data);
        const newsDataString = JSON.stringify(newsData); // Convert parsed JSON object to a string

        // Exclude specific messages from being saved to the database
        if (
          (newsData[0]?.T === "success" &&
            (newsData[0]?.msg === "authenticated" ||
              newsData[0]?.msg === "connected")) ||
          newsData[0]?.T === "subscription"
        ) {
          console.log("Excluded message:", newsDataString);
          return; // Skip saving the excluded message to the database
        }

        console.log("===================================================\n");
        ScrappingHelper.getContentFromNews(newsDataString);
        console.log("===================================================\n");
        await NewsService.add(newsData);
        console.log(`New data arrived: ${newsDataString}`);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(newsDataString);
          }
        });
      } catch (error) {
        // Handle any errors that occur during the asynchronous operations
        console.error("Error occurred while processing news data:", error);
      }
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
