import currentPriceByStockSymbolWSS from ".";

currentPriceByStockSymbolWSS.on("connection", (socket) => {
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
