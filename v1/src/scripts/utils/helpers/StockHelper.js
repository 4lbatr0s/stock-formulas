import Caching from '../constants/Caching.js';

class StockHelper {
    constructor() {}

    filterStockValues(stockValues, filter) {
        const filteredStockValues = stockValues.filter((stockObj) => {
            return filter.some((array) => array[0] === stockObj?.symbol);
        });

        return filteredStockValues;
    }

    sortStockValues(stockValues, sortingParameter) {
        switch (sortingParameter) {
            case Caching.CALCULATIONS.GRAHAM_NUMBERS:
                return stockValues.sort(
                    (a, b) => a.grahamNumber - b.grahamNumber
                );
            case Caching.CALCULATIONS.PRICE_TO_EARNING_RATES:
                return stockValues.sort(
                    (a, b) => a.priceToEarningRate - b.priceToEarningRate
                );
            case Caching.CALCULATIONS.PRICE_TO_BOOK_RATES:
                return stockValues.sort(
                    (a, b) => a.priceToBookRate - b.priceToBookRate
                );
            default:
                break;
        }
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} grahamNumbers graham numbers per each stock we calculate.
     */
    sortStocksByGrahamNumber(stockValues, grahamNumbers) {
        // const filteredStockValues = stockValues.filter((stockObj) => {
        //     return grahamNumbers.some((array) => array[0] === stockObj?.symbol);
        // });

        // return filteredStockValues;
        const filteredStockValues = this.filterStockValues(
            stockValues,
            grahamNumbers
        );
        const result = this.sortStockValues(
            filteredStockValues,
            Caching.CALCULATIONS.GRAHAM_NUMBERS
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToEarningRates price/earning rate values per stock we calculate.
     */
    sortStocksByPriceToEarningRates(stockValues, priceToEarningRates) {
        const filteredStockValues = this.filterStockValues(
            stockValues,
            priceToEarningRates
        );
        const result = this.sortStockValues(
            filteredStockValues,
            Caching.CALCULATIONS.PRICE_TO_EARNING_RATES
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToBookRates price/book rate values per stock we calculate.
     */
    sortStocksByPriceToBookRates(stockValues, priceToBookRates) {
        const filteredStockValues = this.filterStockValues(
            stockValues,
            priceToBookRates
        );
        const result = this.sortStockValues(
            filteredStockValues,
            Caching.CALCULATIONS.PRICE_TO_BOOK_RATES
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} returnOnEquities return on equity values per stock we calculate.
     */
    sortStocksByReturnOnEquities(stockValues) {
        const filteredStockValues = stockValues
        .filter((stockObj)=>  stockObj?.returnOnEquity);
        const sortedStockValues = filteredStockValues.sort((a,b)=>  a.returnOnEquity.raw-b.returnOnEquity.raw);

        return sortedStockValues; 
    }

    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToSales price/sale value per stock we calculate.
     */
    sortStocksByPricesToSales(stockValues, priceToSales) {
        const filteredStockValues = stockValues.filter((stockObj) => {
            return priceToSales.some((array) => array[0] === stockObj?.symbol);
        });

        return filteredStockValues;
    }

    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByDebtToEquities(stockValues) {
        const filteredStockValues = stockValues
        .filter((stockObj)=>  stockObj?.debtToEquity);
        const sortedStockValues = filteredStockValues.sort((a,b)=>  a.debtToEquity.raw-b.debtToEquity.raw);

        return sortedStockValues; 
    }

    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByEbitda(stockValues) {
        const filteredStockValues = stockValues
        .filter((stockObj)=>  stockObj?.ebitda)
        const sortedStockValues = filteredStockValues.sort((a,b)=>  a.ebitda.raw-b.ebitda.raw);
        return sortedStockValues; 
    }


    /**
     *
     * @param {Array} stockValues stock values we get from api
     * @param {Object} calculations arrays of values per each stock choosing formulas we get from the Calculation Service.
     * @returns
     */
    sortStocksByValues(stockValues, calculations) {
        const stockValuesSortedByGraham = this.sortStocksByGrahamNumber(
            stockValues,
            calculations.grahamNumbers
        );
        const stockValuesSortedByPriceToEarningRates =
            this.sortStocksByPriceToEarningRates(
                stockValues,
                calculations.priceToEarningRates
            );
        const stockValuesSortedByPriceToBookRates =
            this.sortStocksByPriceToBookRates(
                stockValues,
                calculations.priceToBookRates
            );
        // const stockValuesSortedByReturnOnEquities =
        //     this.sortStocksByReturnOnEquities(
        //         stockValues,
        //         calculations.returnOnEquityRates
        //     );
        // const stockValuesSortedByPriceToSales = this.sortStocksByPricesToSales(
        //     stockValues,
        //     calculations.priceToSales
        // );
        // const stockValuesSortedByDebtToEquities =
        //     this.sortStocksByDebtToEquities(
        //         stockValues,
        //         calculations.debtToEquities
        //     );

        const sortedStocks = {
            graham: stockValuesSortedByGraham,
            priceToEarningRates: stockValuesSortedByPriceToEarningRates,
            priceToBookRates: stockValuesSortedByPriceToBookRates,
            returnOnEquityRates: '',
            priceToSalesRates: '',
            debtToEquities: '',
        };
        return sortedStocks;
    }

}

export default new StockHelper();
