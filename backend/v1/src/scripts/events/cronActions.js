import StockService from '../../services/Stocks.js';
import redisClient from '../../config/caching/redisConfig.js';
import Caching from '../utils/constants/Caching.js';
import ApiHelper from '../utils/helpers/ApiHelper.js';
import UrlHelper from '../utils/helpers/UrlHelper.js';

const executeStockSymbols = async () => {
  try {
    await StockService.getAllStockSymbolsFromInvesting();
  } catch (error) {
    console.log(error);
  }
};

const getStockRatiosFromInvesting = async () => {
};

const getFinancialDataForSP500AndBIST100 = async () => {
  try {
    const startTime = performance.now();
    const values = JSON.parse(
      await redisClient.get(Caching.BIST100_SP500_FINANCIALS),
    );
    if (!values || Object.keys(values).length < 500) {
      const financialValues = {};
      const sp500Symbols = JSON.parse(
        await redisClient.get(Caching.SYMBOLS.SPFH),
      );
      const bist100Symbols = JSON.parse(
        await redisClient.get(Caching.SYMBOLS.BISTHUND_SYMBOLS),
      );
      const chunkSize = 20;
      const delayBetweenChunks = 1000; // Delay between each chunk of requests (in milliseconds)
      const delayBetweenRequests = 100; // Delay between each individual request (in milliseconds)
      let currentDelay = 0;

      // Divide symbols into chunks of 20
      const sp500Chunks = [];
      const bist100Chunks = [];
      for (let i = 0; i < sp500Symbols.length; i += chunkSize) {
        sp500Chunks.push(sp500Symbols.slice(i, i + chunkSize));
      }
      for (let i = 0; i < bist100Symbols.length; i += chunkSize) {
        bist100Chunks.push(bist100Symbols.slice(i, i + chunkSize));
      }

      // Define a helper function to delay execution
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let count = 1;
      // Iterate over the chunks and send requests with a delay
      for (const chunk of sp500Chunks) {
        currentDelay = 0;
        for (const symbol of chunk) {
          console.log('currentDelay:', currentDelay);
          await delay(currentDelay); // Delay before sending the request
          const response = await ApiHelper.getStockInfoAsyncFinnhub(
            UrlHelper.getFinancialDataFromFinnhubUrl(symbol),
            process.env.FINNHUB_API_KEY,
          );
          financialValues[symbol] = response.metric;
          currentDelay += delayBetweenRequests; // Increase the delay for the next request
          console.log(`request sent for ${symbol}`);
        }
        console.log(`batch ${count} is done`);
        count += 1;
        await delay(delayBetweenChunks); // Delay between each chunk of requests
      }

      // for (const chunk of bist100Chunks) {
      //   for (const symbol of chunk) {
      //     await delay(currentDelay); // Delay before sending the request
      //     const response = await StockService.getSingleStockInfoFromFinnhub(symbol);
      //     financialValues[symbol] = response;
      //     currentDelay += delayBetweenRequests; // Increase the delay for the next request
      //   }
      //   await delay(delayBetweenChunks); // Delay between each chunk of requests
      // }

      // Set the financialValues object in the Redis cache
      await redisClient.set(
        Caching.BIST100_SP500_FINANCIALS,
        JSON.stringify(financialValues),
      );
      console.log('Financial data has been fetched and stored in the cache.');
      const endTime = performance.now();
      const timeDiff = endTime - startTime;
      console.log(`Time passed:${timeDiff}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const getNewsForStocks = async () => {
  try {
    await StockService.getNewsForAllStocks();
  } catch (error) {
    throw new ApiError(error?.message, error?.statusCode);
  }
};

const initialJob = async () => {
  console.log('Sending request INITIAL...');
  try {
    // await getStockRatiosFromInvesting();
    // await executeStockSymbols();
    // await getFinancialDataForSP500AndBIST100();
    // await getNewsForStocks();
  } catch (error) {
    console.error(error);
  }
};

// const quoteDataJobEveryFifteenMinutes = cron.schedule('*/15 * * * *', () => {
//     return StockService.getSP500Concurrent()
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// });

// const financialDataJobEverHour = cron.schedule('0 * * * *', () => {
//     return StockService.messageBroker()
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// });

const jobStarter = async () => {
  await initialJob();
  // quoteDataJobEveryFifteenMinutes.start();
  // financialDataJobEverHour.start();
};

export default jobStarter;
