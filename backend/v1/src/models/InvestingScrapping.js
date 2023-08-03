import { Schema, model } from "mongoose";

const InvestingScrapingSchema = new Schema({
    ratioLink: {
        type:String,
        required:true,
        unique:true
    },
    ticker: {
      type: Schema.Types.ObjectId,
      ref: 'Ticker',
    }
  }, { timestamps: true, versionKey: false });
  
const InvestingScrapingModel = model('InvestingScraping', InvestingScrapingSchema);
export default InvestingScrapingModel;
  
  
  
  