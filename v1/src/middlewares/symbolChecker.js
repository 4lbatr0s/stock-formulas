import httpStatus from "http-status";
import ApiError from "../errors/ApiError.js";
import Messages from "../scripts/utils/constants/Messages.js";
import stockSymbols from "../scripts/utils/constants/StockSymbols.js";
/**
 * 
 * @param  {...any} fields req values.
 * @returns whether a correct format used for stock symbol or not.
 */
const symbolChecker=(req,res,next)=>{
    const symbolField = req.params.stockSymbol;
    if(!symbolField)
    return next(new ApiError(Messages.ERROR.STOCK_SYMBOL_REQUIRED, httpStatus.BAD_REQUEST));
    // return next(globalErrorHandler(Messages.ERROR.STOCK_SYMBOL_REQUIRED));
    if(!symbolField.match(/[A-Za-z]/))
        return next(new ApiError(Messages.ERROR.BAD_STOCK_SYMBOL, httpStatus.BAD_REQUEST));
        // return next(globalErrorHandler(Messages.ERROR.BAD_STOCK_SYMBOL));
    if(!(stockSymbols.includes(symbolField)))
        return next(new ApiError(Messages.ERROR.STOCK_SYMBOL_NOT_FOUND, httpStatus.NOT_FOUND));
    // return next(globalErrorHandler(Messages.ERROR.STOCK_SYMBOL_NOT_FOUND));
    return next();
}

export default symbolChecker;