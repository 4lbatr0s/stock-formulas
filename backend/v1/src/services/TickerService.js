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
  

  async  updateTickerFields(symbol, sentimentScore) {
    try {
      const query = { symbol };
      const update = {
        $inc: {
          totalSentimentScore: sentimentScore,
          numberOfNews: 1,
        },
      };
      const options = {
        upsert: true, // Perform an upsert operation
        setDefaultsOnInsert: true, // Set default values for new documents
        new: true, // Return the updated document
      };
  
      let ticker = await Ticker.findOne(query); // Check if ticker exists
  
      if (!ticker) {
        // Ticker does not exist, create a new instance
        ticker = new Ticker({ symbol });
      }
  
      // Update the ticker using updateOne
      const updatedTicker = await Ticker.findOneAndUpdate(query, update, options);
  
      // Calculate averageSentimentScore
      if (updatedTicker) {
        updatedTicker.averageSentimentScore =
          updatedTicker.totalSentimentScore / updatedTicker.numberOfNews;
        await updatedTicker.save();
      }
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
    }
  }
  
  
  
}

export default new TickerServicve(); // INFO: we can use the "this" keywod in the BaseService, because we create object instance here.
