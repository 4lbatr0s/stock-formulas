import ScrappingHelper from "../helpers/scrapping_helper.js";
import BaseService from "./BaseService.js";
import { stockSymbols } from "../constants/scrappingConstants.js";

class ScrapingService extends BaseService{
    async getStockInfo(symbol){
        const result = await ScrappingHelper.getStockInfo(symbol);
        // const result  = await getStockInfoPuppeeteer(symbol);
        return result; 
    }
    async getMultipleStockInfo(symbols){
        const result = await ScrappingHelper.getMultipleStockInfoAsync(symbols);
        return result;
    }
    async getSP500(){
        const result = await ScrappingHelper.getMultipleStockInfoRateLimitedAsync(stockSymbols);
        return result;
    }
    async getAlphaVantageBatch(symbols){
        const result = await ScrappingHelper.getBatchStockAlphaVantage(symbols);
        return result;
    }
}


export default new ScrapingService();