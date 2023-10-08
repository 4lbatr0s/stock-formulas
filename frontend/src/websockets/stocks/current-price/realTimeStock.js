import { updateCurrentPrice } from 'store/query/StockQueries';

let stockWSS; // Declare the WebSocket variable outside the function

const connectToStockWSS = (dispatch = null) => {
  if (!stockWSS || stockWSS.readyState === WebSocket.CLOSED) {
    // stockWSS = new WebSocket(`${process.env.REACT_APP_ALPACA_WSS_STREAM_URL}${process.env.REACT_APP_ALPACA_REAL_TIME_STOCK_SOURCE}`);
    stockWSS = new WebSocket(`ws://localhost:7373`);
    stockWSS.onopen = () => {
      console.log('Connected to alpaca real-time stock wss');
      const authMessage = JSON.stringify({
        action: process.env.REACT_APP_ALPACA_ACTION,
        key: process.env.REACT_APP_ALPACA_KEY,
        secret: process.env.REACT_APP_ALPACA_SECRET
      });
      stockWSS.send(authMessage);

      const subscriptionMessage = JSON.stringify({
        action: 'subscribe',
        trades: ['AMD', 'CLDR', 'GOOG', 'MSFT', 'AMZN', 'TSLA']
      });
      stockWSS.send(subscriptionMessage);

      stockWSS.onmessage = async (event) => {
        let parsedData = JSON.parse(event.data);
        console.log('Message received from stockWSS:', event.data);
        await updateCurrentPrice(parsedData?.S, parsedData?.p, dispatch);
      };
    };
  } else {
    console.log('STOCK WebSocket connection already exists.');
  }
};

const configureStockWSS = (dispatch) => {
  connectToStockWSS(dispatch);
  stockWSS.onerror = (error) => {
    console.error('WebSocket error:', error.code, error.reason);
    if (isConnectionError(error)) {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectToStockWSS, 5000);
    } else {
      console.log('STOCK WebSocket connection encountered an error. Closing the connection:');
      stockWSS.close();
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

  stockWSS.onclose = (event) => {
    console.log('STOCK WebSocket connection closed:', event.code, event.reason);
    connectToStockWSS(); // Attempt to reconnect
  };
};

export default configureStockWSS;
