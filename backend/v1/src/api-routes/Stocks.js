import express from 'express';
import StocksController from '../controllers/Stocks.js';
import redisCaching from "../middlewares/caching/redis.js";
import apiKeySetter from '../middlewares/apiKeySetter.js';
const router = express.Router();

//alpaca
router.get("/single/news/:stockSymbol", StocksController.getNewsForStock)

//yfinance package
router.get("/multiple/rates", redisCaching, StocksController.getRates);
router.get("/multiple/sp500-concurrent", redisCaching, StocksController.getSP500Concurrent);
router.get("/multiple/bist100-concurrent", redisCaching, StocksController.getBIST100Concurrent);
router.get("/single/yahoo/:stockSymbol", StocksController.getSingleStockInfoFromYahoo);

//finnhub api
router.get("/single/finnhub/:stockSymbol", StocksController.getSingleStockInfoFromFinnhub);


//yfinance api 
router.get("/single/yahoo-api/:stockSymbol", StocksController.getFinancialDataForStock);


//web scrapping
router.get("/bring-sp500-symbols", StocksController.scrapSP500Symbols);
router.get("/bring-bist100-symbols", StocksController.scrapBIST100Symbols);
router.get("/scrap-investing/:companyName", StocksController.scrapeInvestingForRatios);
router.get('/scrap-ratio-routes-from-investing/:countryName/:marketName', StocksController.scrapRatioRoutesFromInvesting)
router.get('/scrap-ratio-values-from-investing/:companyName', StocksController.scrapRatioValues)

router.get("/test/:symbol", StocksController.test);

export default router;

