// helpers.js
import newsSenderWSS from "./index"; // Import the index.js file in the same folder

export const broadcastNewsWithSentimentAnalysis = (data) => {
  newsSenderWSS.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
