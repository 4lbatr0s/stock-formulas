import cheerio, { load } from "cheerio";
import scrappingKeysAndElements from "../constants/ScrappingConstants.js";
import ScriptHelper from "../helper.js";
import ApiHelper from "./ApiHelper.js";
import UrlHelper from "./UrlHelper.js";
import { publicRequest } from "./AxiosHelper.js";
import redisClient from "../../../config/caching/redisConfig.js";
import Caching from "../constants/Caching.js";
import TickerService from "../../../services/TickerService.js";
import puppeteer from "puppeteer";
import investingCom from "../constants/InvestingCom.js";
import InvestingScrapingModel from "../../../models/InvestingScrapping.js";
import browserPromise from "../../../loaders/puppeteer.js";
import mongoose from "mongoose";
class ScrappingHelper {
  constructor() {}
  createStockInfos = (rawScrappingData) => {
    const stockInfos = {};
    for (const [key, value] of Object.entries(scrappingKeysAndElements)) {
      stockInfos[key] = rawScrappingData(value).text();
    }
    // stockInfos['Name'] = rawScrappingData(
    //     '[class="D(ib) Fz(18px)"]'
    // ).text();
    return stockInfos;
  };

  getStockInfo = async (symbol) => {
    console.log(symbol);
    try {
      const axiosResponse = await ApiHelper.getStockInfoAsync(symbol);
      const $ = load(axiosResponse);
      const stockInfos = this.createStockInfos($);
      console.log(stockInfos);
      return stockInfos;
    } catch (error) {
      console.log(error);
    }
  };

  //INFO: when you use, {} in the map, you need to use return!
  getMultipleStockInfos = async (symbols) => {
    console.log(symbols);
    const symbolArray = ScriptHelper.clearStockSymbols(symbols);
    try {
      const stockInfos = await Promise.all(
        symbolArray.map(async (symbol) => {
          const singularStockInfo = await this.getStockInfo(symbol);
          return {
            symbol: singularStockInfo,
          };
        })
      );
      return stockInfos;
    } catch (error) {
      console.log(error);
    }
  };

  async scrapSP500Symbols() {
    try {
      const response = await publicRequest(UrlHelper.scrapSP500SymbolsURL());
      const $ = cheerio.load(response.data);
      const table = $("table.table-hover.table-borderless.table-sm");
      const tbody = table.children("tbody");
      let symbols = [];
      tbody.find("tr").each((i, tr) => {
        const td3 = $(tr).children("td:nth-child(3)");
        const symbol = td3.text().trim();
        symbols.push(symbol);
      });
      symbols = symbols.slice(0, -4);
      await redisClient.set(Caching.SYMBOLS.SPFH, JSON.stringify(symbols));
      const tickers = symbols.map((symbol) => ({
        symbol,
        totalSentimentScore: 0,
        averageSentimentScore: 0,
        numberOfNews: 0,
      }));

      await TickerService.insertMany(tickers);

      return symbols;
    } catch (error) {
      console.log(error);
    }
  }

  async scrapBIST100Symbols() {
    try {
      const response = await publicRequest.get(
        UrlHelper.scrapBist100SymbolsURL()
      );
      const $ = cheerio.load(response.data);
      const stockSymbols = [];

      $("div.detL div.box.box10 table").each((index, element) => {
        const tbody = $(element).find("tbody");
        $(tbody)
          .find("tr:nth-child(n+2) td.currency a b")
          .each((i, e) => {
            stockSymbols.push(`${$(e).text()}.IS`);
          });
      });
      await redisClient.set(
        Caching.SYMBOLS.BISTHUND_SYMBOLS,
        JSON.stringify(stockSymbols)
      );

      const tickers = stockSymbols.map((symbol) => ({
        symbol,
        totalSentimentScore: 0,
        averageSentimentScore: 0,
        numberOfNews: 0,
      }));

      await TickerService.insertMany(tickers);
      return stockSymbols;
    } catch (error) {
      console.error(error);
    }
  }

  getContentFromNews(news) {
    const newsContent = news.content;
    const $ = cheerio.load(news);
    const textContent = $.text();
    console.log(textContent);
  }
  async closePopUpsInInvesting(page) {
    await page.evaluate(() => {
      const closeButtonSelector = ".popupCloseIcon";
      const editionCancelButtonSelector =
        ".topPortfolioFooter .newBtn.LightGray.noIcon";

      // Close the first pop-up
      const closeButton = document.querySelector(closeButtonSelector);
      if (closeButton) {
        closeButton.click();
      }

      // Close the second pop-up
      const editionCancelButton = document.querySelector(
        editionCancelButtonSelector
      );
      if (editionCancelButton) {
        editionCancelButton.click();
      }
    });
  }

  async selectOptionById(page, selectElementId, optionId) {
    // Get the option value based on the option id
    const optionValue = await page.$eval(
      `#${selectElementId} option[id="${optionId}"]`,
      (option) => option.value
    );

    // Select the option in the dropdown
    await page.select(`#${selectElementId}`, optionValue);
  }

  async scrapeInvestingForRatios(url) {
    const browser = await browserPromise;
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );
  
    // Enable request interception
    await page.setRequestInterception(true);
  
    // Listen for the request event to block unnecessary resources
    page.on("request", (request) => {
      const resourceType = request.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font" ||
        resourceType === "media"
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000, // Increase the timeout value to 60 seconds.
    });
    
    await this.closePopUpsInInvesting(page);
  
    // Wait for the table to load (you may need to adjust the selector if necessary)
    try {
      await page.waitForSelector("table.genTbl.reportTbl", {
        waitUntil: "networkidle2",
        visible: true,
      });

      await page.waitForSelector("h1.float_lang_base_1", {
        waitUntil: "networkidle2",
        visible: true,
      });
    } catch (error) {
      console.error("Error waiting for h1 selector:", error);
    }

    const data = await page.evaluate(() => {
      const result = {}; // Create an empty object to store the data
      // Get the stockSymbol and store it in the result object
      const stockSymbolElement = document.querySelector("h1.float_lang_base_1.relativeAttr");
      const regex = /\((.*?)\)/;
      const matches =  stockSymbolElement?.textContent.match(regex);
      if(matches && matches.length>=2)
        result.stockSymbol = matches[1];
      else
        result.stockSymbol = null;    
      // Initialize the tableData property as an empty array in the result object
      result.tableData = [];
      // Loop through the table rows and extract the data
      const tableRows = document.querySelectorAll("table.genTbl.reportTbl tbody tr.child");
      tableRows.forEach((row) => {
        const key = row.querySelector("td span").textContent.trim();
        const values = Array.from(row.querySelectorAll("td:not(:first-child)")).map((td) => td.textContent.trim());
        result.tableData.push({ key, values });
      });
    
      return result;
    });

    let ratioLink = url.replace("-ratios", "");
    const investingModel = await InvestingScrapingModel.findOne({ ratioLink });
    try {
      if(investingModel && !investingModel.ticker){
        const ticker = await TickerService.findOne({symbol:data.stockSymbol});
        if (ticker) {
          const {_id = null} = ticker._doc;
          const tickerId = _id ? mongoose.Types.ObjectId(_id.toString().trim()) : null;          
            console.log("id is:", _id);
            await InvestingScrapingModel.findOneAndUpdate(
              { ratioLink:investingModel.ratioLink },
              { ticker: tickerId }
            );
          }
      }
    } catch(err) {
      console.log(err);
    }
    return data;
  }
  
  async scrapeInvestingForRatioUrls(countryName, marketName) {
    const browser = await browserPromise;
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );

    // Enable request interception
    await page.setRequestInterception(true);

    // Listen for the request event to block unnecessary resources
    page.on("request", (request) => {
      const resourceType = request.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font" ||
        resourceType === "media"
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(
      UrlHelper.scrapInvestingForRatioUrls(investingCom.COUNTRIES[countryName]),
      {
        waitUntil: "networkidle2",
      }
    );

    // Wait for the select element to be ready
    await page.waitForSelector("select#stocksFilter.selectBox", {
      visible: true,
    });
    await page.select(
      "select#stocksFilter.selectBox",
      investingCom.MARKETS[marketName]
    );
    // await page.waitForTimeout(1000); // Adjust this timeout as needed
    await page.waitForSelector("#cross_rate_markets_stocks_1 tbody tr", {
      visible: true,
    });

    const hrefValues = await page.$$eval(
      "#cross_rate_markets_stocks_1 tbody tr",
      (rows) => {
        return rows.map((row) => {
          const secondTd = row.querySelector("td:nth-child(2)");
          const link = secondTd.querySelector("a");
          return link ? link.href : null;
        });
      }
    );

    await browser.close(); // Close the browser when done
    await Promise.all(
      hrefValues.map(async (item) => {
        const investingModel = await InvestingScrapingModel.findOne({ ratioLink: item });
        if (!investingModel) {
          await InvestingScrapingModel.create({ ratioLink: item });
        }
      })
    );
   return hrefValues;
  }

  async scrapingWorker(stock, valueToScrape) {
    try {
      // Perform the scraping process for the given stock
      // Retrieve the missing ratio values using scraping techniques
      const scrapedData = await scrapeDataForStock(stock);

      // Return the scraped data
      return scrapedData;
    } catch (error) {
      // Throw an error if scraping fails
      throw new Error("Scraping error: " + error.message);
    }
  }

  runParallelScraping(scrapingWorker, stock, valueToScrape, timeout = 5000) {
    return new Promise((resolve, reject) => {
      // Create a promise to handle the parallel scraping process
      const scrapingPromise = scrapingWorker(stock, valueToScrape);

      // Wait for the scraping process to complete or timeout
      const timeoutPromise = new Promise((innerResolve, innerReject) =>
        setTimeout(() => innerReject(new Error("Scraping timeout")), timeout)
      );

      Promise.race([scrapingPromise, timeoutPromise])
        .then((scrapedData) => resolve(scrapedData))
        .catch((error) => reject(error));
    });
  }
}

export default new ScrappingHelper();
