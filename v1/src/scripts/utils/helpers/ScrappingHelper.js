import { load } from "cheerio";
import scrappingKeysAndElements from "../constants/ScrappingConstants.js";
import ScriptHelper from "../helper.js";
import ApiHelper from "./ApiHelper.js";
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
    getMultipleStockInfos = async (symbols)=>{
        console.log(symbols);
        const symbolArray = ScriptHelper.clearStockSymbols(symbols);
        try {
            const stockInfos = await Promise.all(symbolArray.map(async (symbol)=> {
                const singularStockInfo = await this.getStockInfo(symbol);
                return {
                    symbol:singularStockInfo
                };
            }))
            return stockInfos; 
        } catch (error) {
            console.log(error);   
        }
    }
}


export default new ScrappingHelper();