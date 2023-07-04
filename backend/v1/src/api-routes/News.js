import express from 'express';
import NewsController from '../controllers/News.js';
const router = express.Router();

//alpaca
router.delete("/delete-all-news/:stockSymbol", NewsController.deleteAllNews);
router.delete("/delete-news/:objectId", NewsController.deleteNews);
router.post("/sentiment-analysis", NewsController.createSentimentAnalysisForNews)

export default router;

