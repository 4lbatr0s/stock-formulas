import ApiError from "../errors/ApiError.js";
import stockSymbols from "../scripts/utils/constants/StockSymbols.js";
import ApiHelper from "../scripts/utils/helpers/ApiHelper.js";
import ScrappingHelper from "../scripts/utils/helpers/ScrappingHelper.js";
import UrlHelper from "../scripts/utils/helpers/UrlHelper.js";
import BaseService from "./BaseService.js";

class StockService extends BaseService{
    async getStockInfo(symbol,next){
        try {
            const result = await ScrappingHelper.getStockInfo(symbol);
            return result;                 
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    };

    async getMultipleStockInfo(symbols, next){ 
        try {
            const result = await ScrappingHelper.getMultipleStockInfos(symbols);
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }
    
    async getMultipleStockInfoFromYahooBatchAPI(symbols, next){
        try {
            const result = await ApiHelper.getStockInfoAsync(UrlHelper.getYahooBatchUrl(symbols));
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getSP500(next){
        const symbols = stockSymbols.join(',')
        try {
            const result = await ApiHelper.getStockInfoAsync(UrlHelper.getYahooBatchUrl(symbols));
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }
    // async getMultipleStockInfo(symbols){
    //     const result = await ScrappingHelper.getMultipleStockInfoAsync(symbols);
    //     return result;
    // }
    // async getSP500(){
    //     const result = await ScrappingHelper.getMultipleStockInfoRateLimitedAsync(stockSymbols);
    //     return result;
    // }
    // async getAlphaVantageBatch(symbols){
    //     const result = await ScrappingHelper.getBatchStockAlphaVantage(symbols);
    //     return result;
    // }
}


export default new StockService();