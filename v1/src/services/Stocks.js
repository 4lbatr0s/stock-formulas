import ApiError from "../errors/ApiError.js";
import stockSymbols from "../scripts/utils/constants/StockSymbols.js";
import ScriptHelper from "../scripts/utils/helper.js";
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

    async getSP500Concurrent(next){
        const symbols = stockSymbols.join(',');
        const chunks = ScriptHelper.chunkArray(symbols, 125);
        try {
            const responses = await Promise.all(
                chunks.map((chunk)=> ApiHelper.getStockInfoAsync(UrlHelper.getYahooBatchUrl(chunk)))
            );
            const result =  responses.map((res)=> res.quoteResponse.result).flat();
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

}


export default new StockService();