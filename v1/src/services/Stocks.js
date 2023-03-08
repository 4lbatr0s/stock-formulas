import ApiError from '../errors/ApiError.js';
import stockSymbols from '../scripts/utils/constants/StockSymbols.js';
import ScriptHelper from '../scripts/utils/helper.js';
import ApiHelper from '../scripts/utils/helpers/ApiHelper.js';
import ScrappingHelper from '../scripts/utils/helpers/ScrappingHelper.js';
import UrlHelper from '../scripts/utils/helpers/UrlHelper.js';
import BaseService from './BaseService.js';
import redisClient from '../config/caching/redisConfig.js';
import CalculationService from './Calculations.js';
import Caching from '../scripts/utils/constants/Caching.js';
import StockHelper from '../scripts/utils/helpers/StockHelper.js';

class StockService extends BaseService {
    async getStockInfo(symbol, next) {
        try {
            const result = await ScrappingHelper.getStockInfo(symbol);
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getMultipleStockInfo(symbols, next) {
        try {
            const result = await ScrappingHelper.getMultipleStockInfos(symbols);
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getMultipleStockInfoFromYahooBatchAPI(symbols, next) {
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYahooBatchUrl(symbols)
            );
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getSP500(next) {
        const symbols = stockSymbols.join(',');
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYahooBatchUrl(symbols)
            );
            return result;
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getSP500Concurrent(next) {
        const symbols = stockSymbols.join(',');
        const chunks = ScriptHelper.chunkArray(symbols, 125);
        try {
            const responses = await Promise.all(
                chunks.map((chunk) =>
                    ApiHelper.getStockInfoAsync(
                        UrlHelper.getYahooBatchUrl(chunk)
                    )
                )
            );
            const result = responses
                .map((res) => res.quoteResponse.result)
                .flat();
            const calculations = CalculationService.getCalculations(result);
            const sortedStocks = StockHelper.sortStocksByValues(
                result,
                calculations
            );
            await redisClient.set(
                Caching.SORTED_STOCKS,
                JSON.stringify(sortedStocks),
                {
                    EXP: 180,
                    NX: true,
                }
            );
            await redisClient.set(Caching.SP_500, JSON.stringify(result), {
                EXP: 180, //expires in 180 seconds.
                NX: true, //set a key value that does not exist in Redis
            });
            // await redisClient.set(Caching.CALCULATIONS.GRAHAM_NUMBERS, JSON.stringify(calculations.grahamNumbers));
            return {
                fromCache: false,
                data: result,
            };
        } catch (error) {
            next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getRates(req){
        try {
            const rateParam = req?.params.rateType;
            const sortedResults = await this.getSP500Concurrent();
            const allSortedStocks = JSON.parse(await redisClient.get(Caching.SORTED_STOCKS));
            const requestedRates = allSortedStocks[rateParam];
            return {
                fromCache:false,
                data:requestedRates
            }
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }
}

export default new StockService();
