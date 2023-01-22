import scrapingService from "../services/ScrapingService.js";


export async function getStockInfos(req,res, next){
    try {
        const startTime = new Date();
        const stockSymbol = req.params.symbol;
        const stockInfo = await scrapingService.getStockInfo(stockSymbol);
        res.status(200).json(stockInfo);
        const endTime = new Date();
        const timeTaken = endTime - startTime;
        console.log(`Time taken: ${timeTaken}ms`);
    } catch (error) {
        next(error); //TIP: next middleware is ErrorHandler!
    }
}

export async function getMultipleStockInfo(req,res, next){
    try {
        const startTime = new Date();
        const stockSymbols = req.query.stockList.split(",");
        console.log(stockSymbols);
        const stockInfo = await scrapingService.getMultipleStockInfo(stockSymbols);
        res.status(200).json(stockInfo);
        const endTime = new Date();
        const timeTaken = endTime - startTime;
        console.log(`Time taken: ${timeTaken}ms`);
    } catch (error) {
        next(error); //TIP: next middleware is ErrorHandler!
    }
}


export async function getSP500(req,res, next){
    try {
        const startTime = new Date();
        const stockInfo = await scrapingService.getSP500();
        res.status(200).json(stockInfo);
        const endTime = new Date();
        const timeTaken = endTime - startTime;
        console.log(`Time taken: ${timeTaken}ms`);
    } catch (error) {
        next(error); //TIP: next middleware is ErrorHandler!
    }
}

export async function getBatchStockAlphaVantage(req, res, next){
    try {
        const stocks = req.query.stockList;
        const stockInfo = await scrapingService.getAlphaVantageBatch(stocks);
        res.status(200).json(stockInfo);
    } catch (error) {
        next(error);
    }
}
