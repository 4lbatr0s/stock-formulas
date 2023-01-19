import { getStockInfoAsync } from "./api_helper.js";
import { BASE_URL } from "./url_helper.js";
import { load } from "cheerio";
import  puppeteer from "puppeteer";
import { scrappingKeysAndElements } from "../constants/scrappingConstants.js";


export const getStockInfo = async (symbol) =>  {
    console.log(symbol)
    try {
        const axiosResponse = await getStockInfoAsync(BASE_URL+`/${symbol}`);
        const $ = load(axiosResponse);
        const stockInfos = createStockInfos($);
        console.log(stockInfos);
        return stockInfos;    
    } catch (error) {
        console.log(error);
    }
}  


export async function getStockInfoPuppeeteer(symbol) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://finance.yahoo.com/quote/${symbol}?p=${symbol}&ncid=yahooproperties_peoplealso_km0o32z3jzm`);
    const stockInfos = createStockInfos(page);
    // Use the page.$eval method to select the element and extract the text
    console.log(stockInfos);
    await browser.close();
    return stockInfos;    
  }

const createStockInfos = (rawScrappingData) => {
    const stockInfos = {};
    Object.keys(scrappingKeysAndElements).forEach(function (key) {
        console.log(key, scrappingKeysAndElements[key])
        stockInfos[key] = rawScrappingData(scrappingKeysAndElements[key]).text();
    });
    return stockInfos;
}
