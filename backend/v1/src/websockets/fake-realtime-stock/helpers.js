import fakeRealTimeStockWSS from "./";

export const sendFakeStockData = (dataToSend) => {
    fakeRealTimeStockWSS.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(dataToSend);
        }
      });
};

const broadCastCurrentPriceByStockSymbol = (data) => {
    console.log("BROADCAST NE CALISTI BEEE");
    currentPriceByStockSymbolWSS.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("broadcast data:", data);
        client.send(JSON.stringify(data));
      }
    });
  };

export const broadcastFakeRealTimeStockData = (data, symbol) => {
    console.log("broadcastFakeRealTimeStockData worked");
    let dataToSend = JSON.stringify(data);
    sendFakeStockData(dataToSend);
    if (symbol) {
      let singularStockData = data.find((stock) => stock?.S === symbol);
      if (singularStockData) {
        broadCastCurrentPriceByStockSymbol(singularStockData);
      }
    }
  };


