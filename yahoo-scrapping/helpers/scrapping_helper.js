import { getStockInfoAsync } from "./api_helper.js";
import { BASE_URL } from "./url_helper.js";
import { load } from "cheerio";
import  puppeteer from "puppeteer";
import {scrappingKeysAndElements} from "../constants/scrappingConstants.js";

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

const createStockInfos = (rawScrappingData) => {
    const stockInfos = {};
    Object.keys(scrappingKeysAndElements).forEach(function (key) {
        console.log(key, scrappingKeysAndElements[key])
        stockInfos[key] = rawScrappingData(scrappingKeysAndElements[key]).text();
    });
    return stockInfos;
}

