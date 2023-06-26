import News from "../../models/News.js";
import Ticker from "../../models/Tickers.js";

const handleNewsSave = async (savedNews) => {
  const {symbols} = savedNews?._doc; // Assuming 'T' represents the stock symbol

  for(let symbol of symbols ){
    const ticker = await Ticker.findOne({ symbol: symbol });
    if (ticker) {
      ticker.totalSentimentScore += savedNews?.semanticAnalysis?.sentimentScore || 0;
      ticker.numberOfNews += 1;
      ticker.averageSentimentScore = (ticker?.totalSentimentScore / ticker?.numberOfNews) || 0;
  
      await ticker.save();
    } else {
      // Create a new Ticker document if it doesn't exist
      const newTicker = new Ticker({
        symbol: stock,
        totalSentimentScore: savedNews?.semanticAnalysis?.sentimentScore || 0,
        averageSentimentScore: savedNews?.semanticAnalysis?.sentimentScore || 0,
        numberOfNews: 1,
      });
  
      await newTicker.save();
    }
  }


};

const handleNewsRemove = async (removedNews) => {
  const stock = removedNews?.symbol; // Assuming 'T' represents the stock symbol

  const ticker = await Ticker.findOne({ symbol: stock });

  if (ticker) {
    ticker.totalSentimentScore -= removedNews.semanticAnalysis.sentimentScore;
    ticker.numberOfNews -= 1;
    ticker.averageSentimentScore = ticker.totalSentimentScore / ticker.numberOfNews;

    await ticker.save();
  }
};
const registerNewsEvents= async () => {
    News.on("save", handleNewsSave);
    News.on("removed", handleNewsRemove);
};

export default registerNewsEvents;