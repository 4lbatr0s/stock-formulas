import ApiError from '../errors/ApiError.js';
import ApiHelper from '../scripts/utils/helpers/ApiHelper.js';
import ScrappingHelper from '../scripts/utils/helpers/ScrappingHelper.js';
import UrlHelper from '../scripts/utils/helpers/UrlHelper.js';
import BaseService from './BaseService.js';
import redisClient from '../config/caching/redisConfig.js';
import Caching from '../scripts/utils/constants/Caching.js';
import StockHelper from '../scripts/utils/helpers/StockHelper.js';
import PagedList from '../models/shared/RequestFeatures/PagedList.js';
import StockExtensions from './extensions/StockExtensions.js';
import RequestHelper from '../scripts/utils/helpers/RequestHelper.js';
import CalculationHelper from '../scripts/utils/helpers/CalculationHelper.js';

class StockService extends BaseService {

    async getSingleStockInfoFromYahoo(symbol) {
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYFinanceSingleStock(symbol)
            );
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }


    async getFinancialDataForStock(symbol) {
        try {
            const result = await ApiHelper.getStockInfoAsync(
                UrlHelper.getYahooFinancialDataUrl(symbol)
            );
            return result?.quoteSummary?.result['0']?.financialData;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }


    async getSP500Concurrent() {
        try {
            const responses = await ApiHelper.getStockInfoAsync(UrlHelper.getYahooBatchUrl());
            const results = await StockHelper.getAskPropertiesFromYfinance(responses);
            CalculationHelper.allOverallValues(results);
            console.log(results.length);
            await redisClient.set( 
                Caching.UNSORTED_STOCKS,
                JSON.stringify(results),
            );
            await redisClient.set(
                Caching.SP_500,
                JSON.stringify(responses),
            );
            return {
                fromCache: false,
                data: responses,
            };
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getBIST100Concurrent(req) {
        try {
            const bist100Symbols = JSON.parse(await redisClient.get(Caching.SYMBOLS.BISTHUND_SYMBOLS)).join(',');
            const responses = await ApiHelper.getStockInfoAsync(UrlHelper.getYFinanceBist100Url(bist100Symbols));

            const results = await StockHelper.getAskPropertiesFromYfinance(responses);
            CalculationHelper.allOverallValues(results);

            await redisClient.set(
                Caching.BIST_100_UNSORTED,
                JSON.stringify(results),
            );
            await redisClient.set(
                Caching.BIST_100_DETAILED_FINANCIALS,
                JSON.stringify(responses),
            );

            const options = RequestHelper.setOptions(req);
            const responseManipulation = StockExtensions.manipulationChaining(
                results,
                options
            );
            const paginatedResult = PagedList.ToPagedList(
                responseManipulation,
                req?.query.pageNumber,
                req?.query.pageSize
            );
            return {
                fromCache: false,
                data: paginatedResult,
            };

        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async getSingleStockInfoFromFinnhub(req) {
        try {
            const result = await ApiHelper.getStockInfoAsyncFinnhub(
                UrlHelper.getFinancialDataFromFinnhubUrl(req.params?.stockSymbol),
                req.headers['X-Finnhub-Token'],
            );
            return result;
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }



    async getRates(req) {
        try {
            await this.getSP500Concurrent();
            const requestedRates = JSON.parse(
                await redisClient.get(Caching.UNSORTED_STOCKS)
            );
            const options = RequestHelper.setOptions(req);
            const responseManipulation = StockExtensions.manipulationChaining(
                requestedRates,
                options
            );
            const paginatedResult = PagedList.ToPagedList(
                responseManipulation,
                req?.query.pageNumber,
                req?.query.pageSize
            );
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
            delete result['BRK.B'];
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




