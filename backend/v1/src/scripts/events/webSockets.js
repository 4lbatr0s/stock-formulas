import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import axios from 'axios';
import NewsService from '../../services/NewsService.js';
import ScrappingHelper from '../utils/helpers/ScrappingHelper.js';
import News from '../../models/News.js';
import TickerService from '../../services/TickerService.js';
import UrlHelper from '../utils/helpers/UrlHelper.js';

const configureWebSockets = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  let newsWebSocket = null; // Track the WebSocket connection

  const connectToNewsWebSocket = () => {
    newsWebSocket = new WebSocket(process.env.ALPACA_WSS_STREAM_URL);

    newsWebSocket.onopen = () => {
      console.log('Connected to the news WebSocket.');

      const authMessage = JSON.stringify({
        action: process.env.ALPACA_ACTION,
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
      });
      newsWebSocket.send(authMessage);

      const subscriptionMessage = JSON.stringify({
        action: 'subscribe',
        news: ['*'],
      });
      newsWebSocket.send(subscriptionMessage);
    };

    newsWebSocket.onmessage = async (event) => {
      try {
        const newsData = JSON.parse(event.data);

        if (shouldExcludeMessage(newsData)) {
          console.log('Excluded message:', event.data);
          return;
        }

        console.log('===================================================\n');
        ScrappingHelper.getContentFromNews(event.data);
        console.log('===================================================\n');
        const { headline, summary, content } = newsData[0];
        const mergedText = headline.concat('. ').concat(summary).concat('. ').concat(content);
        await saveNewsToDatabase(mergedText);
        console.log(`New data arrived: ${event.data}`);

        broadcastNewsData(event.data);
      } catch (error) {
        console.error('Error occurred while processing news data:', error);
      }
    };

    newsWebSocket.onerror = (error) => {
      console.error('WebSocket error:', error);

      if (isConnectionError(error)) {
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectToNewsWebSocket, 5000);
      } else {
        console.log(
          'WebSocket connection encountered an error. Closing the connection.',
        );
        newsWebSocket.close();

        // Additional recovery logic here...
      }
    };

    const isConnectionError = (error) => {
      // Check if the error is a connection error
      // You can customize this logic based on your specific requirements

      if (error && error.code) {
        // Check if the error has a 'code' property
        // Here you can add conditions to identify specific error codes as connection errors
        if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
          return true;
        }
      }

      // If none of the conditions matched, return false
      return false;
    };

    newsWebSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      connectToNewsWebSocket(); // Attempt to reconnect
    };
  };

  const shouldExcludeMessage = (newsData) => {
    const firstMessage = newsData[0];
    return (
      (firstMessage?.T === 'success'
        && (firstMessage?.msg === 'authenticated'
          || firstMessage?.msg === 'connected'))
      || firstMessage?.T === 'subscription'
    );
  };

  const saveNewsToDatabase = async (newsData) => {
    const newsItem = newsData; // Get the first news item from the array

    const result = await axios.post(
      UrlHelper.getSentimentAnalysisForFinancialText(),
      { text: newsItem } // Pass the news item as a string
    );

    const { news, sentiment, score } = result.data[0]; // Assuming the result contains properties like news, sentiment, and score

    const newsItemData = {
      summary: news,
      symbols: newsItem.symbols,
      semanticAnalysis: {
        sentiment,
        sentimentScore: score
      }
    };

    const newsItemModel = new News(newsItemData);
    await NewsService.saveItem(newsItemModel);

    const tickerUpdatePromises = [];
    for (const symbol of newsItemData.symbols) {
      tickerUpdatePromises.push(
        TickerService.updateTickerFields(symbol, newsItemData.semanticAnalysis.sentimentScore)
      );
    }
    await Promise.all(tickerUpdatePromises);
  };

  const broadcastNewsData = (newsDataString) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(newsDataString);
      }
    });
  };

  connectToNewsWebSocket();

  const port = process.env.WSS_PORT || 8080;
  server.listen(port, () => {
    console.log(`wss server listening on port ${port}`);
  });
};

export default configureWebSockets;
