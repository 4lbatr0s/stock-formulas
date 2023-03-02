import express from 'express';
import symbolChecker from '../middlewares/symbolChecker.js';
import StocksController from '../controllers/Stocks.js';
const router = express.Router();

router.get("single/:stockSymbol", symbolChecker, StocksController.getStockInfo);
router.get("/multiple", StocksController.getMultipleStockInfo);
router.get("/multiple/yahoo-batch", StocksController.getMultipleStockInfoFromYahooBatchAPI);
router.get("/multiple/sp500", StocksController.getSP500);


export default router;