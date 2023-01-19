import { Router } from 'express';
import * as scrappingController from "../controllers/scrapping.js";
var router = Router();


router.get("/:stockSymbol", scrappingController.getStockInfos);

export default router;