import WebSocketService from "../../services/WebSocketService";

const newsWebSocket = new WebSocketService({ host:process.env.ALPACA_WSS_STREAM_URL });

export default newsWebSocket;