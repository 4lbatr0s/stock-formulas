// index.js
import WebSocketService from "../../services/WebSocketService";

const newsSenderWSS = new WebSocketService({ port:process.env.NEWS_WITH_ANALYSIS_WSS_PORT });

export default newsSenderWSS;
