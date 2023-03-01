import express from 'express';
import symbolChecker from '../middlewares/symbolChecker.js';
import StocksController from '../controllers/Stocks.js';
const router = express.Router();

router.get("/:stockSymbol", symbolChecker, StocksController.getStockInfo);


export default router;