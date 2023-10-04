let stockWSS;  // Declare the WebSocket variable outside the function

const connectToStockWSS = () => {
  if (!stockWSS || stockWSS.readyState === WebSocket.CLOSED) {
    stockWSS = new WebSocket(`${process.env.REACT_APP_ALPACA_WSS_STREAM_URL}${process.env.REACT_APP_ALPACA_REAL_TIME_STOCK_SOURCE}`);

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

      stockWSS.onmessage = (event) => {
        console.log('Message received from stockWSS:', event.data);
      };
    };
  } else {
    console.log('WebSocket connection already exists.');
  }
};

export default connectToStockWSS;
