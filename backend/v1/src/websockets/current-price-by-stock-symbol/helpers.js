import { WebSocketServer } from "ws";

let stockSymbol = null;

export const setStockSymbol = (symbol) => {
  stockSymbol = symbol;
};

export const getStockSymbol = () => {
  return stockSymbol;
};

const handleOnConnection = (wss) => {
  wss.on("connection", (socket) => {
    console.log("New client connected to currentPriceByStockSymbolWSS.");
    socket.on("message", (event) => {
      const message = JSON.parse(event.toString()); // Convert Buffer to string
      console.log("Received message from client:", message);
      try {
        const parsedSymbol = message;
        setStockSymbol(parsedSymbol);
      } catch (error) {
        console.error("Error parsing message as JSON:", error);
      }
    });
  });
};

// Create a new instance of WebSocketConnector
const startCurrentPriceBySymbolWss = () => {
  const currentPriceByStockSymbolWSS = new WebSocketServer({ port: 5080 });
  handleOnConnection(currentPriceByStockSymbolWSS);
  return currentPriceByStockSymbolWSS;
};

export default startCurrentPriceBySymbolWss;
