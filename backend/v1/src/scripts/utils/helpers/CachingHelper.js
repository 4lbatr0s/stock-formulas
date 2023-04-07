import redisClient from '../../../config/caching/redisConfig.js';
import Caching from '../constants/Caching.js';
import { publicRequest } from './AxiosHelper.js';
import StockExtensions from '../../../services/extensions/StockExtensions.js';
class CachingHelper {
    constructor() {
        this.Caching = Caching;
    }
    getStockSortings = async (rateType) => {
        try {
            const cachedResults = await redisClient.get(Caching.UNSORTED_STOCKS);
            const parsedUnsortedStocks = JSON.parse(cachedResults);
            if(!cachedResults)
                return cachedResults;
            const responseManipulation =  StockExtensions.manipulationChaining(parsedUnsortedStocks, options);
            const paginatedResult = PagedList.ToPagedList(responseManipulation, req?.query.pageNumber, req?.query.pageSize)
            return paginatedResult;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new CachingHelper();
