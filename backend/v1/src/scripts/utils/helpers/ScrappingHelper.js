import cheerio, { load } from 'cheerio';
import scrappingKeysAndElements from '../constants/ScrappingConstants.js';
import ScriptHelper from '../helper.js';
import ApiHelper from './ApiHelper.js';
import UrlHelper from './UrlHelper.js';
import { publicRequest } from './AxiosHelper.js';
import redisClient from '../../../config/caching/redisConfig.js';
import Caching from '../constants/Caching.js';
import TickerService from '../../../services/TickerService.js';
import puppeteer from 'puppeteer';
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
            const response = await publicRequest(
                UrlHelper.scrapSP500SymbolsURL()
            );
            const $ = cheerio.load(response.data);
            const table = $('table.table-hover.table-borderless.table-sm');
            const tbody = table.children('tbody');
            let symbols = [];
            tbody.find('tr').each((i, tr) => {
                const td3 = $(tr).children('td:nth-child(3)');
                const symbol = td3.text().trim();
                symbols.push(symbol);
            });
            symbols = symbols.slice(0, -4);
            await redisClient.set(
                Caching.SYMBOLS.SPFH,
                JSON.stringify(symbols)
            );
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

            $('div.detL div.box.box10 table').each((index, element) => {
                const tbody = $(element).find('tbody');
                $(tbody)
                    .find('tr:nth-child(n+2) td.currency a b')
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
    async closePopUpsInInvesting(page){
        await page.evaluate(() => {
            const closeButtonSelector = '.popupCloseIcon';
            const editionCancelButtonSelector = '.topPortfolioFooter .newBtn.LightGray.noIcon';
          
            // Close the first pop-up
            const closeButton = document.querySelector(closeButtonSelector);
            if (closeButton) {
              closeButton.click();
            }
          
            // Close the second pop-up
            const editionCancelButton = document.querySelector(editionCancelButtonSelector);
            if (editionCancelButton) {
              editionCancelButton.click();
            }
          });
    }
    
    async scrapeInvestingForRatios(stock, valuesToScrape){
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
          });
        const page = await browser.newPage();
        await page.goto('https://google.com');
    
        // Wait for the popup iframe to appear
        await page.waitForSelector('iframe');
    
        // Get the iframe element
        const iframeElement = await page.$('iframe');
    
        // Switch to the iframe
        const iframe = await iframeElement.contentFrame();
    
        // Now, you are inside the iframe, and you can interact with its elements
        // Find the close button inside the iframe
        const closeButton = await iframe.waitForSelector('button.M6CB1c.rr4y5c');
    
        // Click the close button to close the popup
        await closeButton.click();
    
        // After interacting with the iframe, switch back to the main page context
        await page.bringToFront();  
        const searchBox = await page.waitForXPath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea');
        await searchBox.type(stock + "financial ratios investing.com");
        await searchBox.press('Enter');

        await page.waitForNavigation();
        const firstLink = await page.$x('(//div[@class="yuRUbf"]/a)[1]');
        await firstLink[0].click();
        await page.waitForNavigation();
        await this.closePopUpsInInvesting(page);
        // Wait for the table to load (you may need to adjust the selector if necessary)
        await page.waitForSelector('table.genTbl.reportTbl');

        const data = await page.evaluate(() => {
            const tableRows = document.querySelectorAll('table.genTbl.reportTbl tbody tr.child');
        
            const tableData = [];
        
            tableRows.forEach((row) => {
              const key = row.querySelector('td span').textContent.trim();
              const values = Array.from(row.querySelectorAll('td:not(:first-child)')).map((td) => td.textContent.trim());
        
              tableData.push({ key, values });
            });
        
            return tableData;
          });
        return data;
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
          const scrapingPromise = scrapingWorker(stock,valueToScrape);
      
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
