import ApiError from "../errors/ApiError.js";
import ApiHelper from "../scripts/utils/helpers/ApiHelper.js";
import ScrappingHelper from "../scripts/utils/helpers/ScrappingHelper.js";
import UrlHelper from "../scripts/utils/helpers/UrlHelper.js";
import BaseService from "./BaseService.js";
import redisClient from "../config/caching/redisConfig.js";
import Caching from "../scripts/utils/constants/Caching.js";
import StockHelper from "../scripts/utils/helpers/StockHelper.js";
import PagedList from "../models/shared/RequestFeatures/PagedList.js";
import StockExtensions from "./extensions/StockExtensions.js";
import RequestHelper from "../scripts/utils/helpers/RequestHelper.js";
import CalculationHelper from "../scripts/utils/helpers/CalculationHelper.js";
import News from "../models/News.js";
import NewsService from "./NewsService.js";
import axios from "axios";
import TickerService from "./TickerService.js";
import { load } from "cheerio";
class StockService extends BaseService {
  async getSingleStockInfoFromYahoo(symbol) {
    try {
      const result = await ApiHelper.getStockInfoAsync(
        UrlHelper.getYFinanceSingleStock(symbol)
      );
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getFinancialDataForStock(symbol) {
    try {
      const result = await ApiHelper.getStockInfoAsync(
        UrlHelper.getYahooFinancialDataUrl(symbol)
      );
      return result?.quoteSummary?.result["0"]?.financialData;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getSP500Concurrent() {
    try {
      const responses = await ApiHelper.getStockInfoAsync(
        UrlHelper.getYahooBatchUrl()
      );
      const results = await StockHelper.getAskPropertiesFromYfinance(responses);
      CalculationHelper.allOverallValues(results);
      console.log(results.length);
      await redisClient.set(Caching.UNSORTED_STOCKS, JSON.stringify(results));
      await redisClient.set(Caching.SP_500, JSON.stringify(responses));
      return {
        fromCache: false,
        data: responses,
      };
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getBIST100Concurrent(req) {
    try {
      const bist100Symbols = JSON.parse(
        await redisClient.get(Caching.SYMBOLS.BISTHUND_SYMBOLS)
      ).join(",");
      const responses = await ApiHelper.getStockInfoAsync(
        UrlHelper.getYFinanceBist100Url(bist100Symbols)
      );

      const results = await StockHelper.getAskPropertiesFromYfinance(responses);
      CalculationHelper.allOverallValues(results);

      await redisClient.set(Caching.BIST_100_UNSORTED, JSON.stringify(results));
      await redisClient.set(
        Caching.BIST_100_DETAILED_FINANCIALS,
        JSON.stringify(responses)
      );

      const options = RequestHelper.setOptions(req);
      const responseManipulation = StockExtensions.manipulationChaining(
        results,
        options
      );
      const paginatedResult = PagedList.ToPagedList(
        responseManipulation,
        req?.query.pageNumber,
        req?.query.pageSize
      );
      return {
        fromCache: false,
        data: paginatedResult,
      };
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getSingleStockInfoFromFinnhub(req) {
    try {
      const result = await ApiHelper.getStockInfoAsyncFinnhub(
        UrlHelper.getFinancialDataFromFinnhubUrl(req.params?.stockSymbol),
        req.headers["X-Finnhub-Token"]
      );
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getRates(req) {
    try {
      await this.getSP500Concurrent();
      const requestedRates = JSON.parse(
        await redisClient.get(Caching.UNSORTED_STOCKS)
      );
      const options = RequestHelper.setOptions(req);
      const responseManipulation = StockExtensions.manipulationChaining(
        requestedRates,
        options
      );
      const paginatedResult = PagedList.ToPagedList(
        responseManipulation,
        req?.query.pageNumber,
        req?.query.pageSize
      );
      return {
        fromCache: false,
        data: paginatedResult,
      };
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }
  async getNewsForStock(symbol) {
    try {
      const result = await ApiHelper.getStockInfoAsync(
        UrlHelper.getNewsForStockURL(symbol)
      );

      const savePromises = [];
      const tickerUpdatePromises = [];

      for (const item of result) {
        const newsItem = new News({
          summary: item?.news,
          symbols: [symbol],
          semanticAnalysis: {
            sentiment: item?.sentiment,
            sentimentScore: item?.score,
          },
        });

        savePromises.push(NewsService.saveItem(newsItem));
        tickerUpdatePromises.push(
          TickerService.updateTickerFields(
            symbol,
            newsItem.semanticAnalysis.sentimentScore
          )
        );
      }

      await Promise.all(savePromises);
      await Promise.all(tickerUpdatePromises);

      console.log("Items saved:", result.length);

      return result.map((item) => {
        const newsItem = new News({
          summary: item?.news,
          symbols: [symbol],
          semanticAnalysis: {
            sentiment: item?.sentiment,
            sentimentScore: item?.score,
          },
        });

        return newsItem;
      });
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapSP500Symbols() {
    try {
      const result = await ScrappingHelper.scrapSP500Symbols();
      delete result["BRK.B"];
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapBIST100Symbols() {
    try {
      const result = await ScrappingHelper.scrapBIST100Symbols();
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapeInvestingForRatios(companyName) {
    try {
      return await ScrappingHelper.scrapeInvestingForRatios(companyName);
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapRatioRoutesFromInvesting(countryName, marketName) {
    try {
      return await ScrappingHelper.scrapeInvestingForRatioUrls(
        countryName,
        marketName
      );
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapRatioValues(goto) {
    // Use a random user agent to avoid 403 errors
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    ];
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const headers = {
      "User-Agent": userAgent,
    };

    try {
      // Make HTTP request to page
      const { data } = await axios.get(
        `http://www.investing.com/equities/${goto}`,
        { headers }
      );

      // Load HTML and parse with cheerio
      const $ = cheerio.load(data);

      // Extract ratio values into an object
      const ratios = {};
      $("tr.reportsTabRow").each((i, elem) => {
        const key = $(elem).find("td:first-child").text().trim();
        const value = $(elem).find("td:last-child").text().trim();
        ratios[key] = value;
      });

      return ratios;
    } catch (err) {
        throw new ApiError(err?.message, err?.statusCode);
    }
  }
}

export default new StockService();
