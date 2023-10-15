import WebSocketService from "../../services/WebSocketService";

const newsSenderWSS = new WebSocketService(process.env.NEWS_WITH_ANALYSIS_WSS_PORT);
