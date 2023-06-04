import { Schema, model } from 'mongoose';

const NewsSchema = new Schema({
  T: String,
  id: Number,
  headline: String,
  summary: String,
  author: String,
  created_at_news: Date,
  updated_at_news: Date,
  url: String,
  content: String,
  symbols: [String],
  source: String,
  semanticAnalysis: { type: Schema.Types.Mixed }
}, {timestamps:true, versionKey:false});

const News = model('News', NewsSchema);

export default News;
