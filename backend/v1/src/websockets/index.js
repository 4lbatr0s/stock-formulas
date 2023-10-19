// main index.js
import newsWebSocket from "./news-receiver-alpaca/index.js";
import newsSenderWSS from "./news-sender-with-sentiment-analysis/index.js";
import fakeDataSenderWSS from "./fake-realtime-stock/index.js";
import startCurrentPriceBySymbolWss from "./current-price-by-stock-symbol/index.js";
// import createEventListenersForNewsWebSocket from "./news-receiver-alpaca/helpers.js";
const loadWebsockets = () => { 
    // Initialize and connect to each websocket
     const newsSenderSocket = newsSenderWSS();
     newsWebSocket(newsSenderSocket);
     const sendCurrentPriceBySymbolWSS = startCurrentPriceBySymbolWss();
     fakeDataSenderWSS(sendCurrentPriceBySymbolWSS);
    // const websockets = [newsSenderWSS, fakeRealTimeStockWSS, currentPriceByStockSymbolWSS, newsWebSocket];
    // websockets.forEach(ws => ws.connect());
}; 

export default loadWebsockets;
