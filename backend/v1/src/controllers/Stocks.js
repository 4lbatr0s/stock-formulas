import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";
import StockService from "../services/Stocks.js";
import ApiHelper from "../scripts/utils/helpers/ApiHelper.js";
import UrlHelper from "../scripts/utils/helpers/UrlHelper.js";
import InvestingScrapingModel from "../models/InvestingScrapping.js";
import NewsService from "../services/NewsService.js";
import News from "../models/News.js";
import TickerService from "../services/TickerService.js";
import axios from "axios";

class StockController {
  async getSingleStockInfoFromYahoo(req, res, next) {
    try {
      const result = await StockService.getSingleStockInfoFromYahoo(
        req?.params.stockSymbol
      );
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getSingleStockInfoFromFinnhub(req, res, next) {
    try {
      console.log(req.headers);
      req.headers["X-Finnhub-Token"] = process.env.FINNHUB_API_KEY;
      const result = await StockService.getSingleStockInfoFromFinnhub(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getSP500Concurrent(req, res, next) {
    try {
      const result = await StockService.getSP500Concurrent();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getBIST100Concurrent(req, res, next) {
    try {
      const result = await StockService.getBIST100Concurrent(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getRates(req, res, next) {
    try {
      const result = await StockService.getRates(req);
      res.set("X-Pagination", JSON.stringify(result.data.MetaData));
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getNewsForStock(req, res, next) {
    try {
      const result = await StockService.getNewsForStock(
        req.params?.stockSymbol
      );
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getNewsForAllStocks(req, res, next) {
    try {
      const result = await StockService.getNewsForAllStocks();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapeInvestingForRatios(req, res, next) {
    try {
      const result = await StockService.scrapeInvestingForRatios(
        req.params.companyName
      );
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapRatioRoutesFromInvesting(req, res, next) {
    try {
      const result = await StockService.scrapRatioRoutesFromInvesting(
        req.params.countryName,
        req.params.marketName
      );
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapRatioValues(req, res, next) {
    try {
      const result = await StockService.scrapRatioValues(
        req?.params.companyName
      );
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getCurrentPrices(req, res, next) {
    try {
      const result = await StockService.getCurrentPrices();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getCalculatedStockJsons(req, res, next) {
    try {
      const result = await StockService.getCalculatedStockJsons(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getInvestingBIST100(req, res, next) {
    try {
      const result = await StockService.getInvestingBIST100(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getStockRatiosFromInvesting(req, res, next) {
    try {
      const result = await StockService.getStockRatiosFromInvesting();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getAllStockSymbolsFromInvesting(req, res, next) {
    try {
      const result = await StockService.getAllStockSymbolsFromInvesting();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async createTickerDocuments(req, res, next) {
    try {
      const result = await StockService.createTickerDocuments();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async webSocketMock(req, res, next) {
    try {
      const newsData = req.body;
      const { headline, summary, content, symbols } = newsData[0].text;
      const mergedText = headline
        .concat(". ")
        .concat(summary)
        .concat(". ")
        .concat(content);
      const finalData = { mergedText, symbols };

      const newsItem = finalData; // Get the first news item from the array
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
      if (Array.isArray(newsItemData.symbols)) {
        for (const symbol of newsItemData.symbols) {
          tickerUpdatePromises.push(
            TickerService.updateTickerFields(
              symbol,
              newsItemData.semanticAnalysis.sentimentScore
            )
          );
        }
      } else if (newsItemData.symbols) {
        tickerUpdatePromises.push(
          TickerService.updateTickerFields(
            newsItemData.symbols,
            newsItemData.semanticAnalysis.sentimentScore
          )
        );
      }
      await Promise.all(tickerUpdatePromises);
      return res.status(httpStatus.OK).send({});
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new StockController();
