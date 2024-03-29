"use strict";

import axios from "axios";
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
import TickerService from "./TickerService.js";
import InvestingScrapingModel from "../models/InvestingScrapping.js";
import PuppeteerManagerBuilder from "../scripts/utils/managers/puppeteer/PuppeteerManager.js";
import { restrictionConfig } from "../config/puppeteer.js";
import { propertiesToGetFromDB } from "../scripts/utils/constants/Calculations.js";
import investingCom from "../scripts/utils/constants/InvestingCom.js";
import puppeteer from "puppeteer";
class StockService extends BaseService {
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

  async getNewsForAllStocks() {
    const isNewsForEveryStockIsFetched = JSON.parse(
      await redisClient.get(Caching.NEWS.FETCHED_OR_NOT)
    );
    if (!isNewsForEveryStockIsFetched) {
      try {
        const startTime = performance.now();
        const allStockSymbols = JSON.parse(
          await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
        );

        const chunkSize = 20;
        const delayBetweenChunks = 1000; // Delay between each chunk of requests (in milliseconds)
        const delayBetweenRequests = 100; // Delay between each individual request (in milliseconds)
        let currentDelay = 0;

        // Divide symbols into chunks of 20
        const sp500Chunks = [];
        for (let i = 0; i < allStockSymbols.length; i += chunkSize) {
          sp500Chunks.push(allStockSymbols.slice(i, i + chunkSize));
        }

        // Define a helper function to delay execution
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        let count = 1;
        // Iterate over the chunks and send requests with a delay
        for (const chunk of sp500Chunks) {
          currentDelay = 0;
          for (const symbol of chunk) {
            console.log("currentDelay:", currentDelay);
            await delay(currentDelay); // Delay before sending the request
            await this.getNewsForStock(symbol);
            currentDelay += delayBetweenRequests; // Increase the delay for the next request
            console.log(`request sent for ${symbol}`);
          }
          console.log(`batch ${count} is done`);
          count += 1;
          await delay(delayBetweenChunks); // Delay between each chunk of requests
        }
        await redisClient.set(Caching.NEWS.FETCHED_OR_NOT, JSON.stringify(1));
        console.log("Financial data has been fetched and stored in the cache.");
        const endTime = performance.now();
        const timeDiff = endTime - startTime;
        console.log(`Time passed:${timeDiff}`);
      } catch (error) {
        throw new ApiError(error?.message, error?.statusCode);
      }
    }
  }

  async scrapeInvestingForRatios(companyName) {
    try {
      return await ScrappingHelper.scrapeInvestingForRatios(companyName);
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getCurrentPrices() {
    try {
      return await StockHelper.getCurrentPricesFromYFinance(
        JSON.parse(await redisClient.get(Caching.SYMBOLS.INVESTING_SP500))
      );
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async getCalculatedStockJsons(req) {
    try {
      const selectedProperties = propertiesToGetFromDB;
      const documents = await InvestingScrapingModel.find({}).select(
        `-_id ${selectedProperties.join(" ")}`
      );
      const tickers = await TickerService.findAll();
      const selectedValuesArray = documents.map((document) => {
        const selectedValues = {};
        selectedProperties.forEach((property) => {
          if (document[property] && document[property].values) {
            const propertyValue = document[property].values[0]
              ? parseFloat(document[property].values[0]).toFixed(3)
              : 0;
            selectedValues[property] = isNaN(propertyValue)
              ? null
              : Number(propertyValue);
          } else {
            selectedValues[property] = document[property];
          }
        });
        let ticker = tickers.find(
          (ticker) => ticker.symbol === document.stockSymbol
        );
        if (ticker?.numberOfNews > 0) {
          selectedValues.averageSentimentScore = ticker.averageSentimentScore;
        } else {
          selectedValues.averageSentimentScore = null;
        }
        return selectedValues;
      });
      let results = CalculationHelper.allOverallValues(selectedValuesArray);
      await redisClient.set(
        Caching.ALL_STOCKS_CALCULATED,
        JSON.stringify(results)
      );
      const options = RequestHelper.setOptions(req);
      results = req.params.marketName
        ? results.filter(
            (stock) => stock.market === Caching[req.params.marketName]
          )
        : results;
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

  hasQuestionMarkAndEqual(str) {
    if (str.includes("?") && str.includes("=")) {
      const splitted = str.split("?");
      return splitted[0].concat("-ratios?").concat(splitted[1]);
    }
    return `${str}-ratios`;
  }

  async getRatios(page, url) {
    const maxRetries = 3; // Set the maximum number of retries
    const retryDelay = 1000; // Set the delay between retries (in milliseconds)
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
      try {
        const result = await ScrappingHelper.scrapeInvestingForRatios(
          page,
          url
        );
        await page.close();
        return result;
      } catch (error) {
        console.error(`Error on attempt ${retryCount + 1}:`, error);
        if (retryCount < maxRetries) {
          console.log(`Retrying after ${retryDelay} ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          throw new ApiError(error?.message, error?.statusCode);
        }
      }
    }
  }

  async getIndustries(page, url) {
    const maxRetries = 3; // Set the maximum number of retries
    const retryDelay = 1000; // Set the delay between retries (in milliseconds)
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
      try {
        const result = await ScrappingHelper.scrapeInvestingForIndustry(
          page,
          url
        );
        await page.close();
        return result;
      } catch (error) {
        console.error(`Error on attempt ${retryCount + 1}:`, error);
        if (retryCount < maxRetries) {
          console.log(`Retrying after ${retryDelay} ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          throw new ApiError(error?.message, error?.statusCode);
        }
      }
    }
  }

  async getStockRatiosFromInvesting() {
    try {
      console.log("getStockRatiosFromInvesting is started");
      const startTime = performance.now();
      const models = await InvestingScrapingModel.find({});
      const stockSymbols = models.map((model) => model?.stockSymbol);
      await redisClient.set(
        Caching.SYMBOLS.INVESTING_SP500,
        JSON.stringify(stockSymbols)
      );
      const investingRatios = [];
      const batchSize = 15; // Set the batch size
      let waitingTime = 100; // Initial waiting time in milliseconds

      // Divide models into batches
      const batches = [];
      let number = 0;
      for (let i = 0; i < models.length; i += batchSize) {
        const batch = models.slice(i, i + batchSize);
        batches.push(batch);
      }
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const managerBuilder = new PuppeteerManagerBuilder();
      const puppeteerManager = managerBuilder
        .setConcurrency(batchSize)
        .setCustomConfig(restrictionConfig)
        .build();
      let zaman = 0;
      // Process each batch sequentially with waitings
      for (const batch of batches) {
        const x = performance.now();
        console.log(`Processing batch with ${batch.length} models`);
        let links = batch.map((b) => b?.ratioLink);
        await puppeteerManager.runBatchJobs(links, this.getIndustries);
        links = batch.map((b) => this.hasQuestionMarkAndEqual(b?.ratioLink));
        const results = await puppeteerManager.runBatchJobs(
          links,
          this.getRatios
        );
        investingRatios.push(...results);
        // Wait for the specified waiting time
        await delay(waitingTime);
        // console.log(`waiting for ${waitingTime} millisecondc`)
        waitingTime = waitingTime >= 2000 ? 0 : waitingTime + 100;
        const y = performance.now();
        console.log("time passed for batch:", y - x);
        zaman += waitingTime + y - x;
        console.log("total zaman:", zaman);
        number += batchSize;
        console.log(`number:${number}`);
      }
      const endTime = performance.now();
      await puppeteerManager.close();
      // await redisClient.set(
      //   Caching.VALUES.INVESTING_SP500_VALUES_UNSORTED,
      //   JSON.stringify(investingRatios)
      // );
      console.log(`Total time took for entire process: ${endTime - startTime}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getSymbolFromInvesting(page, url) {
    try {
      const result = await ScrappingHelper.scrapeInvestingForSymbol(page, url);
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  //TODO: bu method altinda, aldigin butun semboller icin bir Ticker model instance yarat.
  //Redise buradan getirdigin semboller icin deger set et.
  async getStockSymbolsFromInvesting(routes) {
    try {
      console.log("Method triggered:getStockSymbolsFromInvesting");
      const startTime = performance.now();
      const batchSize = 15; // Set the batch size
      let waitingTime = 100; // Initial waiting time in milliseconds
      const batches = [];
      for (let i = 0; i < routes.length; i += batchSize) {
        const batch = routes.slice(i, i + batchSize);
        batches.push(batch);
      }
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      // Process each batch sequentially with waitings
      const builder = new PuppeteerManagerBuilder();
      const puppeteerManager = builder
        .setConcurrency(batchSize)
        .setCustomConfig(restrictionConfig)
        .build();
      const symbols = [];
      for (const batch of batches) {
        let links = batch.map((b) => this.hasQuestionMarkAndEqual(b));
        const results = await puppeteerManager.runBatchJobs(
          links,
          this.getSymbolFromInvesting
        );
        symbols.push(...results);
        await delay(waitingTime);
        // console.log(`waiting for ${waitingTime} millisecondc`)
        waitingTime = waitingTime >= 2000 ? 0 : waitingTime + 100;
      }
      await redisClient.set(
        Caching.SYMBOLS.ALL_STOCK_SYMBOLS,
        JSON.stringify(symbols)
      );
      await this.createTickerDocuments(symbols);
      await puppeteerManager.close();
      const endTime = performance.now();
      const timeDiff = endTime - startTime;
      console.log("Method done:getStockSymbolsFromInvesting");
      console.log(`Time passed:${timeDiff}`);
      console.log(`Total time took for entire process: ${endTime - startTime}`);
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async createTickerDocuments(symbols) {
    try {
      const allSymbols = JSON.parse(
        await redisClient.get(Caching.SYMBOLS.ALL_STOCK_SYMBOLS)
      );
      TickerService.upsertMany(allSymbols);
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  //TODO: bu method altinda, aldigin butun semboller icin bir Ticker model instance yarat.
  async getAllStockSymbolsFromInvesting() {
    try {
      console.log("Method triggered: getAllStockSymbolsFromInvesting");
      const allRoutes = [];
      const browser = await puppeteer.launch(restrictionConfig);
      const sp500Page = await browser.newPage();
      const bistAllPage = await browser.newPage();
      const [sp500Routes, bistAllRoutes] = await Promise.all([
        this.scrapeInvestingForRatioUrls(
          sp500Page,
          investingCom.COUNTRIES.UNITED_STATES,
          investingCom.MARKETS.SP_500
        ),
        this.scrapeInvestingForRatioUrls(
          bistAllPage,
          investingCom.COUNTRIES.TURKEY,
          investingCom.MARKETS.BIST_ALL_SHARES
        ),
      ]);
      await browser.close();
      allRoutes.push(...sp500Routes, ...bistAllRoutes);
      await this.getStockSymbolsFromInvesting(allRoutes);
      console.log("Method done: getAllStockSymbolsFromInvesting");
      return allRoutes;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  async scrapeInvestingForRatioUrls(page, country, market) {
    const routes = await ScrappingHelper.scrapeInvestingForRatioUrls(
      page,
      country,
      market
    );
    return routes;
  }

  async getStocksAllValues(symbol) {
    try {
      const result = await InvestingScrapingModel.findOne({
        stockSymbol: symbol,
      });
      return result;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }

  handleHistoricalDataDate(dateString){
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth();
    if(month<10) month = `0${month}`;
    let day = date.getDay();
    if(day<10) day = `0${day}`;
    return `${year}-${month}-${day}`
  }

  async getHistoricalDataByStock(symbol) {
    try {
      const historicalDataForAll = JSON.parse(await redisClient.get(Caching.HISTORICAL_DATA_FOR_ALL_STOCKS));
      
      if (!historicalDataForAll || !historicalDataForAll[symbol]) {
        return []; // Return an empty array if data is not available
      }
  
      // Parse the data and format dates to "MM-DD-YYYY" with dashes
      const formattedData = JSON.parse(historicalDataForAll[symbol]).map(item => {
        const dateParts = new Date(item?.Date).toLocaleDateString('en-US').split('/');
        const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
        return {
          date: this.handleHistoricalDataDate(item?.Date),
          close: Number(parseFloat(item?.Close).toFixed(2)),
        };
      });
  
      return formattedData;
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }
  
}

export default new StockService();
