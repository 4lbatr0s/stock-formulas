import { Router } from 'express';
import * as scrappingController from "../controllers/scrapping.js";
var router = Router();


router.get("/stock/:symbol", scrappingController.getStockInfos);
router.get("/multiple", scrappingController.getMultipleStockInfo);
// router.get("/multiple", scrappingController.getSP500);
router.get("/avbatch", scrappingController.getBatchStockAlphaVantage);

export default router;