import ApiError from '../errors/ApiError.js';
import stockSymbols from '../scripts/utils/constants/StockSymbols.js';
import ApiHelper from '../scripts/utils/helpers/ApiHelper.js';
import ScrappingHelper from '../scripts/utils/helpers/ScrappingHelper.js';
import UrlHelper from '../scripts/utils/helpers/UrlHelper.js';
import BaseService from './BaseService.js';
import RabbitMQBase from '../scripts/messageBrokers/rabbitMQ/RabbitMQBase.js';
import CalculationService from './Calculations.js';
import redisClient from '../config/caching/redisConfig.js';
import Caching from '../scripts/utils/constants/Caching.js';
import StockHelper from '../scripts/utils/helpers/StockHelper.js';
import ScriptHelper from '../scripts/utils/helper.js';
import PagedList from '../models/shared/RequestFeatures/PagedList.js';
class StockService extends BaseService {
    async getStockInfo(symbol) {
        try {
            const result = await ScrappingHelper.getStockInfo(symbol);
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getSingleStockInfoFromYahoo(symbol) {
        try {
            const result = await ApiHelper.getStockInfoAsync(UrlHelper.getYahooBatchUrl(symbol));
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getMultipleStockInfo(symbols) {
        try {
            const result = await ScrappingHelper.getMultipleStockInfos(symbols);
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getFinancialDataForStock(symbols) {
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYahooFinancialDataUrl(symbols)
            );
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getSP500() {
        const symbols = stockSymbols.join(',');
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYahooBatchUrl(symbols)
            );
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }
    //TODO: ORIGINAL METHOD.
    // async getSP500Concurrent() {
    //     const symbols = stockSymbols.join(',');
    //     const chunks = ScriptHelper.chunkArray(symbols, 125);
    //     try {
    //         const responses = await Promise.all(
    //             chunks.map((chunk) =>
    //                 ApiHelper.getStockInfoAsync(
    //                     UrlHelper.getYahooBatchUrl(chunk)
    //                 )
    //             )
    //         );
    //         const result = responses
    //             .map((res) => res.quoteResponse.result)
    //             .flat();
    //         const calculations = CalculationService.getCalculations(result);
    //         const sortedStocks = StockHelper.sortStocksByValues(
    //             result,
    //             calculations
    //         );
    //         await redisClient.set(
    //             Caching.SORTED_STOCKS,
    //             JSON.stringify(sortedStocks),
    //             'EX',
    //             15
    //         );
    //         const expireTime = Math.floor(Date.now() / 1000) + 10; // current timestamp + 180 seconds
    //         await redisClient.set(
    //             Caching.SP_500,
    //             JSON.stringify(result),
    //             'EX',
    //             15
    //         );
    //         // console.log(result);
    //         // await redisClient.set(Caching.CALCULATIONS.GRAHAM_NUMBERS, JSON.stringify(calculations.grahamNumbers));
            
    //         return {
    //             fromCache: false,
    //             data: result,
    //         };
    //     } catch (error) {
    //         throw new ApiError(error?.message, error?.statusCode);
    //     }
    // }

    async getSP500Concurrent() {
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
            const calculations = CalculationService.getCalculatedValuesPerEveryStock(result);
            const sortedStocks = StockHelper.sortStocksByValues(
                calculations
            );
            await redisClient.set(
                Caching.SORTED_STOCKS,
                JSON.stringify(sortedStocks),
                'EX',
                15
            );
            const expireTime = Math.floor(Date.now() / 1000) + 10; // current timestamp + 180 seconds
            await redisClient.set(
                Caching.SP_500,
                JSON.stringify(result),
                'EX',
                15
            );
            // console.log(result);
            // await redisClient.set(Caching.CALCULATIONS.GRAHAM_NUMBERS, JSON.stringify(calculations.grahamNumbers));
            
            return {
                fromCache: false,
                data: result,
            };
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }


    async getBIST100Concurrent() {
        const symbols = await redisClient.get(Caching.SYMBOLS.BISTHUND);
        const symbolsParsed = JSON.parse(symbols);
        try {
            const promises = symbolsParsed.map(
                async (symbol) =>
                    await ApiHelper.getStockInfoAsync(
                        UrlHelper.getYahooBatchUrl(symbol)
                    )
            );
            const responses = await Promise.all(promises);
            const result = responses
                .map((res) => res.quoteResponse.result)
                .flat();
            const calculations = CalculationService.getCalculations(result);
            const sortedStocks = StockHelper.sortStocksByValues(
                result,
                calculations
            );
            await redisClient.set(
                Caching.BIST_100_SORTED,
                JSON.stringify(sortedStocks),
                'EX',
                15
            );
            const expireTime = Math.floor(Date.now() / 1000) + 10; // current timestamp + 180 seconds
            await redisClient.set(
                Caching.SP_500,
                JSON.stringify(result),
                'EX',
                15
            );
            // console.log(result);
            // await redisClient.set(Caching.CALCULATIONS.GRAHAM_NUMBERS, JSON.stringify(calculations.grahamNumbers));
            return {
                fromCache: false,
                data: result,
            };
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getSingleStockInfoFromFinnhub(symbols) {
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getFinnHubMultipleStocksUrl(symbols)
            );
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async messageBroker() {
        try {
            console.log('messageBrokerExecutedIntheService');
            const result = await RabbitMQBase.consumeFinnhubMessages();
            await RabbitMQBase.CallThirtyStockPerSeconds();
            const sortedStocksString = await redisClient.get(
                Caching.SORTED_STOCKS
            );
            //parse stocks.
            const sortedStock = JSON.parse(sortedStocksString);
            const returnOnEquities =
                StockHelper.sortStocksByReturnOnEquities(result);
            const debtToEquities =
                StockHelper.sortStocksByDebtToEquities(result);
            const ebitdaValues = StockHelper.sortStocksByEbitda(result);
            sortedStock.debtToEquities = debtToEquities;
            sortedStock.returnOnEquityRates = returnOnEquities;
            sortedStock.ebitdaValues = ebitdaValues;
            redisClient.set(Caching.SORTED_STOCKS, JSON.stringify(sortedStock));
            console.log(result);
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getMultipleStockInformationWithPromiseAll() {
        try {
            const promises = stockSymbols.map(async (symbol) => {
                const result = await this.getFinancialDataForStock(symbol);
                result.quoteSummary.result['0'].financialData.symbol = symbol;
                return result.quoteSummary.result['0'].financialData;
            });
            const results = await Promise.all(promises);
            const sortedStocksString = await redisClient.get(
                Caching.SORTED_STOCKS
            );
            //parse stocks.
            const sortedStock = JSON.parse(sortedStocksString);
            const returnOnEquities =
                StockHelper.sortStocksByReturnOnEquities(results);
            const debtToEquities =
                StockHelper.sortStocksByDebtToEquities(results);
            const ebitdaValues = StockHelper.sortStocksByEbitda(results);
            sortedStock.debtToEquities = debtToEquities;
            sortedStock.returnOnEquityRates = returnOnEquities;
            sortedStock.ebitdaValues = ebitdaValues;
            redisClient.set(Caching.SORTED_STOCKS, JSON.stringify(sortedStock));
            console.log(results);
            return results;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getRates(req) {
        try {
            let requestedRates;
            const rateParam = req?.params.rateType;
            let allSortedStocks = JSON.parse(
                await redisClient.get(Caching.SORTED_STOCKS)
            );
            if (!allSortedStocks) {
                await this.getSP500Concurrent();
                await this.getMultipleStockInformationWithPromiseAll();
                // await this.messageBroker(); //TODO: YOU SOULD USE A MESSAGE BROKER INSTEAD OF THIS
                allSortedStocks = JSON.parse(
                    await redisClient.get(Caching.SORTED_STOCKS)
                );
                requestedRates = allSortedStocks[rateParam];
            }
            const paginatedResult = PagedList.ToPagedList(requestedRates, req?.query.pageNumber, req?.query.pageSize)
            return {
                fromCache: false,
                data: paginatedResult,
            };
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async scrapSP500Symbols() {
        try {
            const result = await ScrappingHelper.scrapSP500Symbols();
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async scrapBIST100Symbols() {
        try {
            const result = await ScrappingHelper.scrapBIST100Symbols();
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }
}

export default new StockService();
