import express from 'express';
import StocksController from '../controllers/Stocks.js';
import redisCaching from '../middlewares/caching/redis.js';

const router = express.Router();
// alpaca
router.get('/single/news/:stockSymbol', StocksController.getNewsForStock);
router.get('/multiple/all-news', StocksController.getNewsForAllStocks);

// finnhub api
router.get('/single/finnhub/:stockSymbol', StocksController.getSingleStockInfoFromFinnhub);
// web scrapping
router.get('/scrap-investing/:companyName', StocksController.scrapeInvestingForRatios);

// investing
router.get('/multiple/get-calculated-ratios/:marketName', redisCaching, StocksController.getCalculatedStockJsons);
router.get('/get-stock-ratios-from-investing', StocksController.getStockRatiosFromInvesting);
router.get('/multiple/stock-symbols', StocksController.getAllStockSymbolsFromInvesting);

//db 
router.get('/:stockSymbol', StocksController.getStocksAllValues);


//TEST
router.route('/multiple/create-ticker-documents').post(StocksController.createTickerDocuments)
router.route('/single/wss').post(StocksController.webSocketMock)

export default router;
