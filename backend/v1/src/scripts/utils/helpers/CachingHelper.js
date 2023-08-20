import redisClient from '../../../config/caching/redisConfig.js';
import Caching from '../constants/Caching.js';
import StockExtensions from '../../../services/extensions/StockExtensions.js';
import PagedList from '../../../models/shared/RequestFeatures/PagedList.js';

class CachingHelper {
  constructor() {
    this.Caching = Caching;
  }

  getStockSortings = async (options, stockExchangeType) => {
    try {
      const cachedResults = stockExchangeType.startsWith('investing-sp500')
        ? await redisClient.get(Caching.VALUES.INVESTING_SP500_VALUES_SORTED)
        : stockExchangeType.startsWith('investing-bist100')
          ? await redisClient.get(Caching.VALUES.INVESTING_BIST100_VALUES_SORTED)
          : null;
      const parsedUnsortedStocks = JSON.parse(cachedResults);
      if (!cachedResults) return cachedResults;

      const responseManipulation = StockExtensions.manipulationChaining(
        parsedUnsortedStocks,
        options,
      );
      const paginatedResult = PagedList.ToPagedList(
        responseManipulation,
        options.pageNumber,
        options.pageSize,
      );
      return paginatedResult;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CachingHelper();
