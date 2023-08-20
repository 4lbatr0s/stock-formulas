import httpStatus from 'http-status';
import ApiError from '../errors/ApiError.js';
import StockService from '../services/Stocks.js';
import ApiHelper from '../scripts/utils/helpers/ApiHelper.js';
import UrlHelper from '../scripts/utils/helpers/UrlHelper.js';
import StockHelper from '../scripts/utils/helpers/StockHelper.js';
import InvestingScrapingModel from '../models/InvestingScrapping.js';

class StockController {
  async getSingleStockInfoFromYahoo(req, res, next) {
    try {
      const result = await StockService.getSingleStockInfoFromYahoo(req?.params.stockSymbol);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getSingleStockInfoFromFinnhub(req, res, next) {
    try {
      console.log(req.headers);
      req.headers['X-Finnhub-Token'] = process.env.FINNHUB_API_KEY;
      const result = await StockService.getSingleStockInfoFromFinnhub(
        req,
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

  async getNewsForStock(req, res, next) {
    try {
      const result = await StockService.getNewsForStock(req.params?.stockSymbol);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getNewsForAllStocks(req, res, next) {
    try {
      const result = await StockService.getNewsForAllStocks();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapeInvestingForRatios(req, res, next) {
    try {
      const result = await StockService.scrapeInvestingForRatios(req.params.companyName);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapRatioRoutesFromInvesting(req, res, next) {
    try {
      const result = await StockService.scrapRatioRoutesFromInvesting(req.params.countryName, req.params.marketName);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async scrapRatioValues(req, res, next) {
    try {
      const result = await StockService.scrapRatioValues(req?.params.companyName);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getCurrentPrices(req, res, next) {
    try {
      const result = await StockService.getCurrentPrices();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getInvestingSP500(req, res, next) {
    try {
      const result = await StockService.getInvestingSP500(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getInvestingBIST100(req, res, next) {
    try {
      const result = await StockService.getInvestingBIST100(req);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getStockRatiosFromInvesting(req, res, next) {
    try {
      const result = await StockService.getStockRatiosFromInvesting();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async getAllStockSymbolsFromInvesting(req,res,next){
    try {
      const result = await StockService.getAllStockSymbolsFromInvesting();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new StockController();
