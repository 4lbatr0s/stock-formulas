import axios from "axios";
import newsWebSocket from "./index.js";
import webSocketConstants from "../../scripts/utils/constants/Websockets.js";
import schemas from "./schemas.js";
import UrlHelper from "../../scripts/utils/helpers/UrlHelper.js";
import News from "../../models/News.js";
import NewsService from "../../services/NewsService.js";
import redisClient from "../../config/caching/redisConfig.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import TickerService from "../../services/TickerService.js";
import { broadcastNewsWithSentimentAnalysis } from "../news-sender-with-sentiment-analysis/helpers.js";
import WebSocket, { WebSocketServer } from "ws";

const checkIfNewsOrNot = (receivedMessage) => {
  let receivedSingle = receivedMessage?.T === "n";
  let receivedMultiple = receivedMessage[0]?.T === "n";
  return receivedSingle || receivedMultiple;
};

const mergeText = (parameters) => {
  const { headline, summary, content, symbols } = parameters[0];
  const mergedText = headline
    .concat(". ")
    .concat(summary)
    .concat(". ")
    .concat(content);
  return { mergedText, symbols };
};

const sendAxiosPostReq = async (newsItem) => {
  var result = await axios.post(
    UrlHelper.getSentimentAnalysisForFinancialText(),
    {
      text: newsItem?.mergedText,
    }
  );
  return result.data;
};

const createNewsToSave = (parameters) => {
  const newsItemToSave = {
    summary: parameters?.news,
    symbols: parameters?.newsItem,
    semanticAnalysis: {
      sentiment: parameters?.sentiment,
      sentimentScore: parameters?.score,
    },
  };
  return new News(newsItemToSave);
};

const saveNewsToDatabase = async (newsItem) => {
  const result = await sendAxiosPostReq(newsItem);
  const { news, sentiment, score } = result[0];
  const newsItemToSave = createNewsToSave({ news, sentiment, score, newsItem });
  NewsService.saveItem(newsItemToSave);
  return newsItemToSave;
};

const checkIfSymbolInCacheAndUpdateTicker = async (
  newsItemToSave,
  tickerUpdatePromises
) => {
  let allStockSymbols = JSON.parse(
    await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
  );
  for (const symbol of newsItemToSave.symbols) {
    const symbolString = String(symbol); // Convert to string
    if (allStockSymbols.includes(symbolString)) {
      tickerUpdatePromises.push(
        TickerService.updateTickerFields(
          symbol,
          newsItemToSave.semanticAnalysis.sentimentScore
        )
      );
    }
  }
};

const updateTickerFields = async (newsItemToSave) => {
  const tickerUpdatePromises = [];
  const allStockSymbols = JSON.parse(
    await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
  );
  if (
    Array.isArray(newsItemToSave.symbols) &&
    newsItemToSave.symbols.length > 0
  ) {
    await checkIfSymbolInCacheAndUpdateTicker(
      newsItemToSave,
      tickerUpdatePromises
    );
  }
  return Promise.all(tickerUpdatePromises);
};

const broadCastNews = async (newsItemData, sendNewsToClientSocket) => {
  const allStockSymbols = JSON.parse(
    await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
  );
  if (newsItemData.symbols.some((symbol) => allStockSymbols.includes(symbol))) {
    broadcastNewsWithSentimentAnalysis({ socket:sendNewsToClientSocket, data: newsItemData });
  }
};

const isConnectionError = (error) => {
  if (error && error.code) {
    return (
      error.code === webSocketConstants.ERROR.CODES.REFUSED ||
      error.code === webSocketConstants.ERROR.CODES.RESET
    );
  }
  return false;
};

let reconnectTimeout;

const startWebSocket = (sendNewsToClientSocket) => {
  const name = "News Receiver";
  const alpacaUrl = "wss://stream.data.alpaca.markets/v1beta1/news";
  const newsWebSocket = new WebSocket(alpacaUrl);
  const time = 5000; // delay
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5; // You can adjust this value

  // Register the event listeners outside of the "open" handler
  newsWebSocket.on("open", async () => {
    console.log(`${name} worked on open`);
    const authenticationData = JSON.stringify(schemas.AUTHENTICATION);
    newsWebSocket.send(authenticationData);
    const subscriptionData = JSON.stringify(schemas.SUBSCRIPTION);
    newsWebSocket.send(subscriptionData);
  });

  newsWebSocket.on("message", async (event) => {
    console.log(`${name} worked on message`);
    try {
      const parsedData = JSON.parse(event.toString());
      console.log();
      if (checkIfNewsOrNot(parsedData)) {
        const newsItem = mergeText(parsedData);
        const newsItemToSave = await saveNewsToDatabase(newsItem);
        newsItemToSave.symbols = newsItem.symbols;
        await updateTickerFields(newsItemToSave);
        await broadCastNews(newsItemToSave, sendNewsToClientSocket);
      }
    } catch (error) {
      console.log(error);
    }
  });

  newsWebSocket.on("error", async (event) => {
    console.log(`${name} worked on error`);
    if (isConnectionError(event) && reconnectAttempts < maxReconnectAttempts) {
      webSocketConstants.MESSAGES.retryingConnection(time);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      reconnectTimeout = setTimeout(startWebSocket, time);
      reconnectAttempts++;
    } else {
      webSocketConstants.MESSAGES.closingTheConnection();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      // Optionally handle the case where the maximum reconnection attempts are reached
    }
  });

  newsWebSocket.on("close", () => {
    console.log(`${name} worked on close`);
    if (reconnectAttempts < maxReconnectAttempts) {
      webSocketConstants.MESSAGES.retryingConnection(time);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      reconnectTimeout = setTimeout(startWebSocket, time);
      reconnectAttempts++;
    } else {
      // Optionally handle the case where the maximum reconnection attempts are reached
    }
  });
};

export default startWebSocket;
