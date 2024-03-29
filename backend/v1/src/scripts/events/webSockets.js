import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import axios from "axios";
import NewsService from "../../services/NewsService.js";
import ScrappingHelper from "../utils/helpers/ScrappingHelper.js";
import News from "../../models/News.js";
import TickerService from "../../services/TickerService.js";
import UrlHelper from "../utils/helpers/UrlHelper.js";
import redisClient from "../../config/caching/redisConfig.js";
import Caching from "../utils/constants/Caching.js";
import configurecurrentPriceWSS from "../../websockets/current-price-receiver/index.js";
import { broadcastNewsWithSentimentAnalysis } from "../../websockets/news-sender-with-sentiment-analysis/helpers.js";
import loadWebsockets from "../../websockets/index.js";
import { broadcastFakeRealTimeStockData } from "../../websockets/fake-realtime-stock/helpers.js";
import fakeRealTimeStockSchema from "../../websockets/fake-realtime-stock/schemas.js";
import { onConnection as onConnectionCurrentStockPriceBySymbol } from "../../websockets/current-price-by-stock-symbol/helpers.js";

let stockSymbol;
const setStockSymbol = (value) => {
  stockSymbol = value;
};

const configureWebSockets = () => {
  loadWebsockets();
  onConnectionCurrentStockPriceBySymbol();
  
  let newsWebSocket = null; // Track the WebSocket connection
  const connectToNewsWebSocket = () => {
    newsWebSocket = new WebSocket(process.env.ALPACA_WSS_STREAM_URL);
    newsWebSocket.onopen = () => {
      console.log("Connected to the news WebSocket.");
      const authMessage = JSON.stringify();
      newsWebSocket.send(authMessage);

      const subscriptionMessage = JSON.stringify();
      newsWebSocket.send(subscriptionMessage);
    };
    newsWebSocket.onmessage = async (event) => {
      try {
        const newsData = JSON.parse(event.data);
        if (shouldExcludeMessage(newsData)) {
          console.log("Excluded message:", event.data);
          return;
        }
        console.log("===================================================\n");
        ScrappingHelper.getContentFromNews(event.data);
        console.log("===================================================\n");
        const { headline, summary, content, symbols } = newsData[0];
        const mergedText = headline
          .concat(". ")
          .concat(summary)
          .concat(". ")
          .concat(content);
        const finalData = { mergedText, symbols };
        await saveNewsToDatabase(finalData);
        console.log(`New data arrived: ${event.data}`);
        broadcastNewsWithSentimentAnalysis(event.data);
      } catch (error) {
        console.error("Error occurred while processing news data:", error);
      }
    };
    newsWebSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (isConnectionError(error)) {
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectToNewsWebSocket, 5000);
      } else {
        console.log(
          "WebSocket connection encountered an error. Closing the connection."
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
        if (error.code === "ECONNRESET" || error.code === "ECONNREFUSED") {
          return true;
        }
      }
      // If none of the conditions matched, return false
      return false;
    };

    newsWebSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      connectToNewsWebSocket(); // Attempt to reconnect
    };
  };

  const shouldExcludeMessage = (newsData) => {
    const firstMessage = newsData[0];
    return (
      (firstMessage?.T === "success" &&
        (firstMessage?.msg === "authenticated" ||
          firstMessage?.msg === "connected")) ||
      firstMessage?.T === "subscription"
    );
  };

  const saveNewsToDatabase = async (newsData) => {
    const newsItem = newsData; // Get the first news item from the array
    const result = await axios.post(
      UrlHelper.getSentimentAnalysisForFinancialText(),
      { text: newsItem.mergedText } // Pass the news item as a string
    );
    const { news, sentiment, score } = result.data[0]; // Assuming the result contains properties like news, sentiment, and score
    const newsItemData = {
      summary: news,
      symbols: newsItem.symbols ? newsItem.symbols : [],
      semanticAnalysis: {
        sentiment,
        sentimentScore: score,
      },
    };
    const newsItemModel = new News(newsItemData);
    await NewsService.saveItem(newsItemModel);
    const tickerUpdatePromises = [];

    // the for loop below creates a ticker if it does not exist in the db and updates the news sentiment score.
    const allStockSymbols = JSON.parse(
      await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
    );
    if (
      Array.isArray(newsItemData.symbols) &&
      newsItemData.symbols.length > 0
    ) {
      for (const symbol of newsItemData.symbols) {
        if (allStockSymbols.includes(symbol)) {
          tickerUpdatePromises.push(
            TickerService.updateTickerFields(
              symbol,
              newsItemData.semanticAnalysis.sentimentScore
            )
          );
          //when sentiment analysis job is finished, send the news item data to the frontend.
        }
      }
    }
    if (
      newsItemData.symbols.some((symbol) => allStockSymbols.includes(symbol))
    ) {
      broadcastNewsWithSentimentAnalysis(newsItemData);
    }
    await Promise.all(tickerUpdatePromises);
  };

  connectToNewsWebSocket();
 
  setInterval(() => {
    let fakeData = fakeRealTimeStockSchema.MOCK.QUOTES;
    broadcastFakeRealTimeStockData(fakeData, stockSymbol);
  }, 3000);

  // configurecurrentPriceWSS();
};

export default configureWebSockets;
