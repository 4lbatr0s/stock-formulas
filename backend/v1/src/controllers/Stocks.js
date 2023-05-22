import httpStatus from 'http-status';
import ApiError from '../errors/ApiError.js';
import StockService from '../services/Stocks.js';
import stockSymbols from '../scripts/utils/constants/StockSymbols.js';
import redisClient from '../config/caching/redisConfig.js';
import Caching from '../scripts/utils/constants/Caching.js';
class StockController {
    async test(req,res,next){
        try {
            const financialValues = new Map(JSON.parse(await redisClient.get(Caching.BIST100_SP500_FINANCIALS)));
            const symb = financialValues.get(req.params.symbol)
            return res.status(httpStatus.OK).send(symb);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getSingleStockInfoFromYahoo(req, res, next) {
        try {
            const result = await StockService.getSingleStockInfoFromYahoo(req?.params.stockSymbol);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }


    async getFinancialDataForStock(req, res, next) {
        try {
            const result = await StockService.getFinancialDataForStock(
                req.params?.stockSymbol
            );
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            if (typeof next === 'function') {
                return next(new ApiError(error?.message, error?.statusCode));
            } else {
                throw new ApiError(error?.message, error?.statusCode);
            }
        }
    }

    async getSingleStockInfoFromFinnhub(req, res, next) {
        try {
            console.log(req.headers);
            req.headers['X-Finnhub-Token'] = process.env.FINNHUB_API_KEY;
            const result = await StockService.getSingleStockInfoFromFinnhub(
                req
            );
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getSP500Concurrent(req, res, next) {
        try {
            const result = await StockService.getSP500Concurrent();
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async getBIST100Concurrent(req, res, next) {
        try {
            const result = await StockService.getBIST100Concurrent(req);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }


    async getRates(req, res, next) {
        try {
            const result = await StockService.getRates(req);
            res.set('X-Pagination', JSON.stringify(result.data.MetaData));
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async scrapSP500Symbols(req, res, next) {
        try {
            const result = await StockService.scrapSP500Symbols();
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }
    async scrapBIST100Symbols(req, res, next) {
        try {
            const result = await StockService.scrapBIST100Symbols();
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));
        }
    }
}

export default new StockController();