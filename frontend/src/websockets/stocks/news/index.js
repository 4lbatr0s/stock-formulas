let newsWSS;

const connectToNewsWSS = (callback) => {
  if (!newsWSS || newsWSS.readyState === WebSocket.CLOSED) {
    newsWSS = new WebSocket(`${process.env.REACT_APP_REAL_TIME_NEWS_URL}`);
    newsWSS.onopen = () => {
      console.log('Connected to realtime-news wss');
      newsWSS.onmessage = async (event) => {
        console.log('Message received from newsWSS:', event.data);
        callback(event.data);
      };
    };
  } else {
    console.log('NewsWebSocket connection already exists.');
  }
};

const configureNewsWSS = (callback) => {
  connectToNewsWSS(callback);

  newsWSS.onerror = (error) => {
    console.error('WebSocket error:', error);
    if (isConnectionError(error)) {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => connectToNewsWSS(callback), 5000);
    } else {
      console.log('NEWS WebSocket connection encountered an error. Closing the connection.');
      newsWSS.close();
      // Additional recovery logic here...
    }
  };

  function isConnectionError(error) {
    if (error && error.target.readyState === WebSocket.CLOSED) {
      return true;
    }
    return false;
  }

  newsWSS.onclose = (event) => {
    console.log('NEWS WebSocket connection closed:', event.code, event.reason);
    connectToNewsWSS(callback); // Attempt to reconnect
  };
};

export default configureNewsWSS;
