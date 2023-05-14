import express from 'express';
import StocksController from '../controllers/Stocks.js';
import redisCaching from "../middlewares/caching/redis.js";
import apiKeySetter from '../middlewares/apiKeySetter.js';
const router = express.Router();


router.get("/multiple/rates", redisCaching, StocksController.getRates);
router.get("/multiple/financial-data", redisCaching, StocksController.getFinancialDatasWithPromisAll);
router.get("/multiple/sp500-concurrent", redisCaching, StocksController.getSP500Concurrent);
router.get("/bring-bist100-symbols", StocksController.scrapBIST100Symbols);
router.get("/bring-sp500-symbols", StocksController.scrapSP500Symbols);
router.get("/multiple/bist100-concurrent", redisCaching, StocksController.getBIST100Concurrent);
router.get("/single/finnhub/:stockSymbol", apiKeySetter, StocksController.getSingleStockInfoFromFinnhub);



router.get("/single-from-yahoo/:stockSymbol", StocksController.getSingleStockInfoFromYahoo);
router.get("/multiple", StocksController.getMultipleStockInfo);
router.get("/single/yahoo-financial/:stockSymbol", StocksController.getFinancialDataForStock);

export default router;

