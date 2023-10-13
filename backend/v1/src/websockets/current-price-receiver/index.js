import WebSocket, { WebSocketServer } from "ws";
import { saveCurrentPriceToCache } from "./helpers.js";

let currentPriceWSS; // Declare the WebSocket variable outside the function

const connectToCurrentPriceReceiverWSS = () => {
  if (!currentPriceWSS || currentPriceWSS.readyState === WebSocket.CLOSED) {
    currentPriceWSS = new WebSocket(
      `${process.env.ALPACA_WSS_STREAM_URL_CURENT_PRICE}/${process.env.ALPACA_REAL_TIME_STOCK_SOURCE}`
    );
    // currentPriceWSS = new WebSocket(`ws://localhost:7373`);
    currentPriceWSS.onopen = () => {
      const authMessage = JSON.stringify({
        action: process.env.ALPACA_ACTION,
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
      });
      currentPriceWSS.send(authMessage);

      const subscriptionMessage = JSON.stringify({
        action: "subscribe",
        trades: ["AMD", "CLDR", "GOOG", "MSFT", "AMZN", "TSLA"],
      });
      currentPriceWSS.send(subscriptionMessage);

      currentPriceWSS.onmessage = async (event) => {
        let parsedData = JSON.parse(event.data);
        let isMessage = "msg" in parsedData[0];
        let subscription = parsedData[0]["T"] === "subscription";
        let prerequirements = !isMessage && !subscription 
        if (prerequirements) {
          await saveCurrentPriceToCache(parsedData?.S, parsedData?.p);
        }
      };
    };
  } else {
    console.log("CURREN_PRICE_RECEIVER WebSocket connection already exists.");
  }
};

const configurecurrentPriceWSS = () => {
  connectToCurrentPriceReceiverWSS();
  currentPriceWSS.onerror = (error) => {
    console.error("WebSocket error:", error.code, error.reason);
    if (isConnectionError(error)) {
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectToCurrentPriceReceiverWSS, 5000);
    } else {
      console.log(
        "CURREN_PRICE WebSocket connection encountered an error. Closing the connection:"
      );
      currentPriceWSS.close();
      // Additional recovery logic here...
    }
  };
  const isConnectionError = (error) => {
    if (error && error.code) {
      if (error.code === "ECONNRESET" || error.code === "ECONNREFUSED") {
        return true;
      }
    }
    return false;
  };

  currentPriceWSS.onclose = (event) => {
    console.log(
      "CURREN_PRICE WebSocket connection closed:",
      event.code,
      event.reason
    );
    connectToCurrentPriceReceiverWSS(); // Attempt to reconnect
  };
};

export default configurecurrentPriceWSS;
