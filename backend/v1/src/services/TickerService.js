import Ticker from "../models/Tickers.js";
import BaseService from "../services/BaseService.js";
class TickerServicve extends BaseService {
  model = Ticker;
  async insertMany(items) {
    return await this.model.insertMany(items);
  }
  async updateTickerFields(symbol, sentimentScore) {
    try {
      const update = {
        $inc: {
          totalSentimentScore: sentimentScore,
          numberOfNews: 1,
        },
      };
      const ticker = await this.update({ symbol }, update, {
        new: true,
      });
      if (!ticker) {
        // Ticker not found, handle the case appropriately
        return;
      }
      ticker.averageSentimentScore =
        ticker.totalSentimentScore / ticker.numberOfNews;
      await ticker.save();
    } catch (error) {
      // Handle the error appropriately
    }
  }
}

export default new TickerServicve(); //INFO: we can use the "this" keywod in the BaseService, because we create object instance here.
