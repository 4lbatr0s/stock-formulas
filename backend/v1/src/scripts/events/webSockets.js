import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import NewsService from "../../services/NewsService.js";
import ScrappingHelper from "../utils/helpers/ScrappingHelper.js";

const configureWebSockets = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  let newsWebSocket = null; // Track the WebSocket connection

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

        if (shouldExcludeMessage(newsData)) {
          console.log("Excluded message:", event.data);
          return;
        }

        console.log("===================================================\n");
        ScrappingHelper.getContentFromNews(event.data);
        console.log("===================================================\n");

        await saveNewsToDatabase(newsData);
        console.log(`New data arrived: ${event.data}`);

        broadcastNewsData(event.data);
      } catch (error) {
        console.error("Error occurred while processing news data:", error);
      }
    };

    newsWebSocket.onerror = (error) => {
      console.error("WebSocket error:", error);

      if (isConnectionError(error)) {
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectToNewsWebSocket, 5000);
      } else {
        console.log("WebSocket connection encountered an error. Closing the connection.");
        newsWebSocket.close();

        // Additional recovery logic here...
      }
    };

    newsWebSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      connectToNewsWebSocket(); // Attempt to reconnect
    };
  };

  const shouldExcludeMessage = (newsData) => {
    const firstMessage = newsData[0];
    return (
      (firstMessage?.T === "success" &&
        (firstMessage?.msg === "authenticated" ||
          firstMessage?.msg === "connected")) ||
      firstMessage?.T === "subscription"
    );
  };

  const saveNewsToDatabase = async (newsData) => {
    await NewsService.add(newsData);
  };

  const broadcastNewsData = (newsDataString) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newsDataString);
      }
    });
  };

  connectToNewsWebSocket();

  const port = process.env.WSS_PORT || 8080;
  server.listen(port, () => {
    console.log(`wss server listening on port ${port}`);
  });
};

export default configureWebSockets;
