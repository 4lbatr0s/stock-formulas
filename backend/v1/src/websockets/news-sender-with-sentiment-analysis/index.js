// index.js
import { WebSocketServer } from "ws";
import { broadcastNewsWithSentimentAnalysis } from "./helpers.js";

const startWebSocket = () => {
    const portNumber = 5001; 
    const newsSenderWSS = new WebSocketServer({ port:portNumber });
    return newsSenderWSS;
}

export default startWebSocket;
