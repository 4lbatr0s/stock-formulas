import httpStatus from 'http-status';
import { fileURLToPath } from 'url';
import path from 'path';
import ApiError from '../errors/ApiError.js';
import ApiNotFoundError from '../errors/ApiNotFoundError.js';
import StockService from '../services/Stocks.js'; 
const __filename = fileURLToPath(import.meta.url);//get all name
const __dirname = path.dirname(__filename); //get dir name from it.

class StockController {
    async getStockInfo(req,res,next){
        try {
            const result = await StockService.getStockInfo(req.params.stockSymbol);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));          
        }
    }
    async getMultipleStockInfo(req,res,next){
        try {
            const result = await StockService.getMultipleStockInfo(req.query?.symbols);
            return res.status(httpStatus.OK).send(result);
        } catch (error) {
            return next(new ApiError(error?.message, error?.statusCode));          
        }
    }
}

export default new StockController();
