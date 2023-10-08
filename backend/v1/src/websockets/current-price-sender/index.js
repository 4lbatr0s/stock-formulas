import { saveCurrentPriceToCache } from "./helpers";

let currentPriceSenderWSS; // Declare the WebSocket variable outside the function

const connectTocurrentPriceSenderWSS = () => {
  if (!currentPriceSenderWSS || currentPriceSenderWSS.readyState === WebSocket.CLOSED) {
    // currentPriceSenderWSS = new WebSocket(`${process.env.REACT_APP_ALPACA_WSS_STREAM_URL}${process.env.REACT_APP_ALPACA_REAL_TIME_CURREN_PRICE_SOURCE}`);
    currentPriceSenderWSS = new WebSocket(`ws://localhost:7373`);
    currentPriceSenderWSS.onopen = () => {
      console.log('Connected to CURRENT PRICE SENDER LISTENER WSS');
      currentPriceSenderWSS.onmessage = async (event) => {
        console.log('Message received from currentPriceSenderWSS:', event.data);
        await saveCurrentPriceToCache(event.data?.S, event.data?.p)
      };
    };
  } else {
    console.log('CURREN_PRICE WebSocket connection already exists.');
  }
};

const configurecurrentPriceSenderWSS = () => {
  connectTocurrentPriceSenderWSS();
  currentPriceSenderWSS.onerror = (error) => {
    console.error('WebSocket error:', error.code, error.reason);
    if (isConnectionError(error)) {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectTocurrentPriceSenderWSS, 5000);
    } else {
      console.log('CURRENT PRICE SENDER WebSocket connection encountered an error. Closing the connection:');
      currentPriceSenderWSS.close();
      // Additional recovery logic here...
    }
  };
  const isConnectionError = (error) => {
    if (error && error.code) {
      if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
        return true;
      }
    }
    return false;
  };

  currentPriceSenderWSS.onclose = (event) => {
    console.log('CURREN_PRICE WebSocket connection closed:', event.code, event.reason);
    connectTocurrentPriceSenderWSS(); // Attempt to reconnect
  };
};

export default configurecurrentPriceSenderWSS;
