import axios from "axios";
import newsWebSocket from ".";
import webSocketConstants from "../../scripts/utils/constants/Websockets";
import schemas from "./schemas";
import UrlHelper from "../../scripts/utils/helpers/UrlHelper";
import News from "../../models/News";
import NewsService from "../../services/NewsService";
import redisClient from "../../config/caching/redisConfig";
import Caching from "../../scripts/utils/constants/Caching";
import TickerService from "../../services/TickerService";
import { broadcastNewsWithSentimentAnalysis } from "../news-sender-with-sentiment-analysis/helpers";

const mergeText = (parameters) => {
    const {headline, summary, content, symbols} = parameters;
    const mergedText = headline
        .concat(". ")
        .concat(summary)
        .concat(". ")
        .concat(content);
    return {mergedText, symbols};
}

const sendAxiosPostReq = async (newsItem) => {
    return await axios.post(UrlHelper.getSentimentAnalysisForFinancialText(), {text:newsItem?.mergedText});
}

const createNewsToSave = (parameters) => {
    const newsItemToSave = {
        summary: parameters?.news,
        symbols: parameters?.newsItem,
        semanticAnalysis:{
            sentiment: parameters?.sentiment,
            sentimentScore: parameters?.sentimentScore, 
        },
    }
    return new News(newsItemToSave);
}

const saveNewsToDatabase = async (newsItem) => {
    const result = await sendAxiosPostReq(newsItem);
    const { news, sentiment, score } = result.data[0];
    const newsItemToSave = createNewsToSave({news, sentiment, score, newsItem});
    NewsService.saveItem(newsItemToSave);
    return newsItemToSave;
}

const checkIfSymbolInCacheAndUpdateTicker = async (newsItemToSave, tickerUpdatePromises) => {
    let allStockSymbols = JSON.parse(await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS));
    for (const symbol of newsItemToSave.symbols){
        if(allStockSymbols.includes(symbol)){
            tickerUpdatePromises.push(TickerService.updateTickerFields(symbol, newsItemToSave.semanticAnalysis.sentimentScore))
        }
    }
}

const updateTickerFields = async (newsItemToSave) => {
    const tickerUpdatePromises = [];
    const allStockSymbols = JSON.parse(await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS));
    if (Array.isArray(newsItemToSave.symbols) && newsItemToSave.symbols.length > 0) {
      checkIfSymbolInCacheAndUpdateTicker(newsItemToSave, tickerUpdatePromises);
    }
    return Promise.all(tickerUpdatePromises);
  };

const broadCastNews = async (newsItemData) =>{
    const allStockSymbols = JSON.parse(await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS));
    if(newsItemData.symbols.some((symbol) => allStockSymbols.includes(symbol))){
        broadcastNewsWithSentimentAnalysis(newsItemData);
    }
}

const isConnectionError = (error) => {
    if(error && error.code){
        return error.code === webSocketConstants.ERROR.CODES.REFUSED || error.code ==== webSocketConstants.ERROR.CODES.RESET
    }
    return false;
}


const createEventListeners = () => {
    newsWebSocket.addEventListener(webSocketConstants.EVENTS.OPEN, async () => {
        const authReq = JSON.stringify(schemas.AUTHENTICATION);
        newsWebSocket.send(authReq);
        const subReq = JSON.stringify(schemas.SUBSCRIPTION);
        newsWebSocket.send(subReq);
    });

    newsWebSocket.addEventListener(webSocketConstants.EVENTS.MESSAGE, async (event)=> {
        const newsItem = mergeText(event.data);
        const newsItemToSave = saveNewsToDatabase(newsItem)
        await updateTickerFields(newsItemToSave);
        await broadCastNews(newsItemToSave);
    });

    newsWebSocket.addEventListener(webSocketConstants.EVENTS.ERROR, async (event)=> {
        if(isConnectionError(event)){
            const time = 5
            webSocketConstants.MESSAGES.retryingConnection(time);
            createEventListeners();
        } else {
            webSocketConstants.MESSAGES.closingTheConnection();
            newsWebSocket.disconnect();
        }
    });

    newsWebSocket.addEventListener(webSocketConstants.EVENTS.CLOSE, async (event)=> {
        createEventListeners();
    });
}

createEventListeners();

