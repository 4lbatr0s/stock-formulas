class StockHelper {
    constructor() {}

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} grahamNumbers graham numbers per each stock we calculate.
     */
    sortStocksByGrahamNumber(stockValues, grahamNumbers) {
        const filteredStockValues = stockValues.filter((stockObj) => {
            return grahamNumbers.some((array) => array[0] === stockObj?.symbol);
        });

        return filteredStockValues;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToEarningRates price/earning rate values per stock we calculate.
     */
    sortStocksByPriceToEarningRates(stockValues, priceToEarningRates) {
        const filteredStockValues = stockValues.filter((stockObj) => {
            return priceToEarningRates.some(
                (array) => array[0] === stockObj?.symbol
            );
        });

        return filteredStockValues;
    }

    /**
     * 
     * @param {Array} stockValues stock values we get from api 
     * @param {Object} calculations arrays of values per each stock choosing formulas we get from the Calculation Service.
     * @returns 
     */
    sortStocksByValues(stockValues, calculations){
        const stockValuesSortedByGraham = this.sortStocksByGrahamNumber(stockValues, calculations.grahamNumbers);
        const stockValuesSortedByPriceToEarningRates = this.sortStocksByPriceToEarningRates(stockValues, calculations.priceToEarningRates);
        const sortedStocks={ 
            graham:stockValuesSortedByGraham,
            stockValuesSortedByPriceToEarningRates:stockValuesSortedByPriceToEarningRates
        };
        return sortedStocks;
    }

    storeAllSortingsInRedis(...sorts) {}
}

export default new StockHelper();
