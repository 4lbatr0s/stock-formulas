import scrapingService from "../services/ScrapingService.js";


export async function getStockInfos(req,res, next){
    try {
        const startTime = new Date();
        const stockSymbol = req.params.stockSymbol;
        const stockInfo = await scrapingService.getStockInfo(stockSymbol);
        res.status(200).json(stockInfo);
        const endTime = new Date();
        const timeTaken = endTime - startTime;
        console.log(`Time taken: ${timeTaken}ms`);
    } catch (error) {
        next(error); //TIP: next middleware is ErrorHandler!
    }
}
