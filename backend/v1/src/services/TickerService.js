import Ticker from "../models/Tickers.js";
import BaseService from "./BaseService.js";

class TickerServicve extends BaseService {
  model = Ticker;

  async insertMany(items) {
    return await this.model.insertMany(items);
  }
  async upsertMany(items) {
    const bulkOperations = items.map((item) => ({
      updateOne: {
        filter: { symbol:item }, // You might need to adjust the filter criteria
        update: { $set: {symbol:item}},
        upsert: true,
      },
    }));
    return await this.model.bulkWrite(bulkOperations);
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

export default new TickerServicve(); // INFO: we can use the "this" keywod in the BaseService, because we create object instance here.
