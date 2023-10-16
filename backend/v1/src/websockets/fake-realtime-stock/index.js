// index.js
import WebSocketService from "../../services/WebSocketService";

const fakeRealTimeStockWSS = new WebSocketService(7373);

export default fakeRealTimeStockWSS;

