// index.js
import WebSocketService from "../../services/WebSocketService";

const currentPriceByStockSymbolWSS = new WebSocketService({ port:5080 });

export default currentPriceByStockSymbolWSS;