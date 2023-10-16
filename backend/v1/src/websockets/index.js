// main index.js
import newsSenderWSS from "./news-sender-with-sentiment-analysis"; // Adjust the path accordingly
import fakeRealTimeStockWSS from "./fake-realtime-stock";
import currentPriceByStockSymbolWSS from "./current-price-by-stock-symbol/helpers";
import newsWebSocket from "./news-receiver-alpaca";
const loadWebsockets = () => { 
    // Initialize and connect to each websocket
    const websockets = [newsSenderWSS, fakeRealTimeStockWSS, currentPriceByStockSymbolWSS, newsWebSocket];
    websockets.forEach(ws => ws.connect());
}; 

export default loadWebsockets;
