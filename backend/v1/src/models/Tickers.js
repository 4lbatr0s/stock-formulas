import { Schema, model } from 'mongoose';

const TickerSchema = new Schema({
  symbol: { type: String, unique: true },
  totalSentimentScore: Number,
  averageSentimentScore: Number,
  numberOfNews: Number,
}, { timestamps: true, versionKey: false });

const Ticker = model('Ticker', TickerSchema);

export default Ticker;
