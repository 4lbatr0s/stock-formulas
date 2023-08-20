import express from 'express';
import StocksController from '../controllers/Stocks.js';
import redisCaching from '../middlewares/caching/redis.js';
import apiKeySetter from '../middlewares/apiKeySetter.js';

const router = express.Router();
// alpaca
router.get('/single/news/:stockSymbol', StocksController.getNewsForStock);
router.get('/multiple/allNews', StocksController.getNewsForAllStocks);

// finnhub api
router.get('/single/finnhub/:stockSymbol', StocksController.getSingleStockInfoFromFinnhub);
// web scrapping
router.get('/scrap-investing/:companyName', StocksController.scrapeInvestingForRatios);
router.get('/scrap-ratio-routes-from-investing/:countryName/:marketName', StocksController.scrapRatioRoutesFromInvesting);
router.get('/scrap-ratio-values-from-investing/:companyName', StocksController.scrapRatioValues);
// investing
router.get('/multiple/investing-sp500', redisCaching, StocksController.getInvestingSP500);
router.get('/multiple/investing-bist100', redisCaching, StocksController.getInvestingBIST100);
router.get('/get-stock-ratios-from-investing', StocksController.getStockRatiosFromInvesting);
router.get('/multiple/stock-symbols', StocksController.getAllStockSymbolsFromInvesting)

export default router;
