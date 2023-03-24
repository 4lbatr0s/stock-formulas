import express from 'express';
import symbolChecker from '../middlewares/symbolChecker.js';
import StocksController from '../controllers/Stocks.js';
import redisCaching from "../middlewares/caching/redis.js";
import apiKeySetter from '../middlewares/apiKeySetter.js';

const router = express.Router();

router.get("/single/:stockSymbol", symbolChecker, StocksController.getStockInfo);
router.get("/multiple", StocksController.getMultipleStockInfo);
router.get("/multiple/yahoo-batch", StocksController.getMultipleStockInfoFromYahooBatchAPI);
router.get("/multiple/finnhub/:stockSymbol", apiKeySetter, StocksController.getMultipleStockInfoFromFinnhub);
router.get("/multiple/sp500", StocksController.getSP500);
router.get("/multiple/sp500-concurrent", redisCaching, StocksController.getSP500Concurrent);
router. get("/multiple/rates/:rateType", redisCaching, StocksController.getRates);
router.get("/multiple/message-broker", StocksController.messageBroker)
export default router;

