import { Schema, model } from 'mongoose';

const NewsSchema = new Schema(
  {
    T: String,
    id: Number,
    headline: String,
    summary: String,
    author: String,
    url: String,
    content: String,
    symbols: [String],
    source: String,
    semanticAnalysis: {
      sentiment: String,
      sentimentScore: Number,
    },
    isDeleted: Boolean,
  },
  { timestamps: true, versionKey: false },
);

NewsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 60 });

const News = model('News', NewsSchema);

export default News;
