import redisClient from "../../../config/caching/redisConfig.js";
import Caching from "../constants/Caching.js";
import StockExtensions from "../../../services/extensions/StockExtensions.js";
import PagedList from "../../../models/shared/RequestFeatures/PagedList.js";

class CachingHelper {
  constructor() {
    this.Caching = Caching;
  }

  getStockSortings = async (options, stockExchangeType) => {
    try {
      const allStockSortings = JSON.parse(
        await redisClient.get(Caching.ALL_STOCKS_CALCULATED)
      );
      let cachedResults = allStockSortings;
      if(stockExchangeType && allStockSortings && allStockSortings.length>0 ){
        cachedResults = allStockSortings.filter((s) => s.market === Caching[stockExchangeType])
      } 
      if (!cachedResults) return cachedResults;
      const responseManipulation = StockExtensions.manipulationChaining(
        allStockSortings,
        options
      );
      const paginatedResult = PagedList.ToPagedList(
        responseManipulation,
        options.pageNumber,
        options.pageSize
      );
      return paginatedResult;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CachingHelper();
