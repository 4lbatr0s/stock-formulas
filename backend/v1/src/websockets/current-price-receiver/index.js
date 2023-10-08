import { saveCurrentPriceToCache } from "./helpers";

let currentPriceWSS; // Declare the WebSocket variable outside the function

const connectToCurrentPriceReceiverWSS = () => {
  if (!currentPriceWSS || currentPriceWSS.readyState === WebSocket.CLOSED) {
    // currentPriceWSS = new WebSocket(`${process.env.REACT_APP_ALPACA_WSS_STREAM_URL}${process.env.REACT_APP_ALPACA_REAL_TIME_CURREN_PRICE_SOURCE}`);
    currentPriceWSS = new WebSocket(`ws://localhost:7373`);
    currentPriceWSS.onopen = () => {
      console.log('Connected to CURRENT PRICE LISTENER WSS');
      currentPriceWSS.onmessage = async (event) => {
        console.log('Message received from currentPriceWSS:', event.data);
        await saveCurrentPriceToCache(event.data?.S, event.data?.p)
      };
    };
  } else {
    console.log('CURREN_PRICE_RECEIVER WebSocket connection already exists.');
  }
};

const configurecurrentPriceWSS = () => {
  connectToCurrentPriceReceiverWSS();
  currentPriceWSS.onerror = (error) => {
    console.error('WebSocket error:', error.code, error.reason);
    if (isConnectionError(error)) {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectToCurrentPriceReceiverWSS, 5000);
    } else {
      console.log('CURREN_PRICE WebSocket connection encountered an error. Closing the connection:');
      currentPriceWSS.close();
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

  currentPriceWSS.onclose = (event) => {
    console.log('CURREN_PRICE WebSocket connection closed:', event.code, event.reason);
    connectToCurrentPriceReceiverWSS(); // Attempt to reconnect
  };
};

export default configurecurrentPriceWSS;
