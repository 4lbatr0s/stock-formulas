import express from 'express';
import symbolChecker from '../middlewares/symbolChecker.js';
import StocksController from '../controllers/Stocks.js';
import redisCaching from "../middlewares/caching/redis.js";
import apiKeySetter from '../middlewares/apiKeySetter.js';
import globalErrorHandler from '../middlewares/error.js';
const router = express.Router();

router.get("/single/:stockSymbol", symbolChecker, StocksController.getStockInfo);
router.get("/single-from-yahoo/:stockSymbol", StocksController.getSingleStockInfoFromYahoo);
router.get("/multiple", StocksController.getMultipleStockInfo);
router.get("/single/yahoo-financial/:stockSymbol", StocksController.getFinancialDataForStock);
router.get("/multiple/finnhub/:stockSymbol", apiKeySetter, StocksController.getMultipleStockInfoFromFinnhub);
router.get("/multiple/sp500", StocksController.getSP500);
router.get("/multiple/sp500-concurrent", redisCaching, StocksController.getSP500Concurrent);
router.get("/multiple/bist100-concurrent", redisCaching, StocksController.getBIST100Concurrent);
router. get("/multiple/rates/:rateType", redisCaching, StocksController.getRates);
router.get("/multiple/message-broker", StocksController.messageBroker);
router.get("/denemecigeldi", StocksController.getFinancialDatasWithPromisAll);
router.get("/bring-sp500-symbols", StocksController.scrapSP500Symbols);
router.get("/bring-bist100-symbols", StocksController.scrapBIST100Symbols);

export default router;

