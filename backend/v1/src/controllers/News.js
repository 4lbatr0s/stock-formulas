import httpStatus from 'http-status';
import NewsService from '../services/NewsService.js';
import ApiError from '../errors/ApiError.js';
import { publicRequest } from '../scripts/utils/helpers/AxiosHelper.js';
import UrlHelper from '../scripts/utils/helpers/UrlHelper.js';

class StockController {
  async deleteAllNews(req, res, next) {
    try {
      await NewsService.deleteAll('symbols', req.params?.stockSymbol);
      return res.status(httpStatus.OK).send({});
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async deleteNews(req, res, next) {
    try {
      const deletedNews = await NewsService.softDelete(req.params?.objectId);
      return res.status(httpStatus.OK).send(deletedNews);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async createSentimentAnalysisForNews(req, res, next) {
    try {
      const { text } = req.body;
      const sentimentAnalysis = await publicRequest.post(
        UrlHelper.getSentimentAnalysisForFinancialText(),
        {
          text,
        },
      );
      return res.status(httpStatus.OK).send(sentimentAnalysis);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new StockController();
