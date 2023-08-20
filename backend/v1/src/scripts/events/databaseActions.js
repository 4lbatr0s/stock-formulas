import News from '../../models/News.js';
import Ticker from '../../models/Tickers.js';
import NewsService from '../../services/NewsService.js';
import TickerService from '../../services/TickerService.js';

const handleNewsSave = async (savedNews) => {
  // const { symbols } = savedNews?._doc; // Assuming 'T' represents the stock symbol
  // for (let symbol of symbols) {
  //   const ticker = await Ticker.findOne({ symbol: symbol }); // Use `findOne` instead of `find`
  //   if (ticker) {
  //     ticker.totalSentimentScore +=
  //       savedNews?.semanticAnalysis?.sentimentScore || 0;
  //     ticker.numberOfNews += 1;
  //     ticker.averageSentimentScore =
  //       ticker?.totalSentimentScore / ticker?.numberOfNews || 0;
  //     await ticker.save(); // Call `save` on the found document
  //   } else {
  //     // Create a new Ticker document if it doesn't exist
  //     const newTicker = new Ticker({
  //       symbol: symbol,
  //       totalSentimentScore: savedNews?.semanticAnalysis?.sentimentScore || 0,
  //       averageSentimentScore: savedNews?.semanticAnalysis?.sentimentScore || 0,
  //       numberOfNews: 1,
  //     });

  //     await newTicker.save();
  //   }
  // }
};

const handleNewsRemove = async (removedNews) => {
  const { symbols } = removedNews?.symbols;
  for (const symbol of symbols) {
    const ticker = await Ticker.findOne({ symbol });

    if (ticker) {
      ticker.totalSentimentScore -= removedNews.semanticAnalysis?.sentimentScore;
      ticker.numberOfNews -= 1;
      ticker.averageSentimentScore = ticker.totalSentimentScore / ticker.numberOfNews;

      await ticker.save();
    }
  }
};

const registerNewsEvents = async () => {
  News.watch().on('change', async (change) => {
    if (change.operationType === 'update') {
      const removedNewsId = change.documentKey._id;
      console.log('removedNewsId:', removedNewsId);
      const removedNews = await NewsService.delete(removedNewsId.toString());
      await handleNewsRemove(removedNews);
    }
  });
};

export default registerNewsEvents;
