import WebSocket, { WebSocketServer } from "ws";
import currentPriceByStockSymbolWSS from "./index.js"; // Import the WebSocket instance
import schemas from "./schemas.js";
import { getStockSymbol } from "../current-price-by-stock-symbol/helpers.js";

const sendFakeStockData = (socket, dataToSend) => {
  socket.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("worked")
      client.send(dataToSend);
    }
  });
};

const broadCastCurrentPriceByStockSymbol = (socket, data) => {
  console.log("BROADCAST NE CALISTI BEEE");
  socket.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("broadcast data:", data);
      client.send(JSON.stringify(data));
    }
  });
};

export const broadcastFakeRealTimeStockData = (currentPriceBySymbolSocket, data, symbol) => {
  console.log("broadcastFakeRealTimeStockData worked");
  console.log("symbol:", symbol);
  let dataToSend = JSON.stringify(data);
  sendFakeStockData(currentPriceBySymbolSocket, dataToSend);
  if (symbol) {
    let singularStockData = data.find((stock) => stock?.S === symbol);
    if (singularStockData) {
      broadCastCurrentPriceByStockSymbol(currentPriceBySymbolSocket, singularStockData);
    }
  }
};

const startWebSocket = (currentPriceBySymbolSocket) => {
  const fakeRealTimeStockWSS = new WebSocketServer({ port: 7373 });
  setInterval(()=> {
    broadcastFakeRealTimeStockData(currentPriceBySymbolSocket, schemas.MOCK.QUOTES(), getStockSymbol());
  }, 1500)
};

export default startWebSocket;
