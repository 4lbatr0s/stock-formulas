import WebSocket from "ws";
// helpers.js
export const broadcastNewsWithSentimentAnalysis = (parameters) => {
  const { socket, data } = parameters; 
  socket.clients.forEach((client) => {
    if ((client.readyState === WebSocket.OPEN) && data) {
      client.send(JSON.stringify(data));
    }
  });
};
