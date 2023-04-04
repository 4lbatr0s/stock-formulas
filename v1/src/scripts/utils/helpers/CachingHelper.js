import redisClient from '../../../config/caching/redisConfig.js';
import Caching from '../constants/Caching.js';

class CachingHelper {
    constructor() {
        this.Caching = Caching;
    }
    getStockSortings = async (rateType) => {
        try {
            const cachedResults = await redisClient.get(Caching.SORTED_STOCKS);
            if(!cachedResults)
                return cachedResults;
            const parsedCachedResults = JSON.parse(cachedResults);
            switch (rateType) {
                case Caching.CALCULATIONS.GRAHAM_NUMBERS:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.GRAHAM_NUMBERS
                    ];
                case Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES
                    ];
                case Caching.CALCULATIONS.PRICE_TO_BOOK_RATES:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.PRICE_TO_BOOK_RATES
                    ];
                case Caching.CALCULATIONS.PRICE_TO_EARNING_RATES:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.PRICE_TO_EARNING_RATES
                    ];
                case Caching.CALCULATIONS.PRICE_TO_SALES_RATES:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.PRICE_TO_SALES_RATES
                    ];
                case Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES
                    ];
                case Caching.CALCULATIONS.EBITDA:
                    return parsedCachedResults[
                        Caching.CALCULATIONS.EBITDA
                    ];
                default: //TODO: sp500 yoksa ne olacak? cachede deger yoksa bisey donme, break et.
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export default new CachingHelper();
