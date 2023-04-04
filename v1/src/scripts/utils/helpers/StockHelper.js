import Caching from '../constants/Caching.js';

class StockHelper {
    #defaultPositive = 999999999999999;
    #defaultNegative = -999999999999999;
    constructor() {}

    sortStockValues(stockValues, sortingParameter) {
        switch (sortingParameter) {
            case Caching.CALCULATIONS.GRAHAM_NUMBERS:
                return stockValues.sort(
                    (a, b) => a.grahamNumber - b.grahamNumber
                );
            case Caching.CALCULATIONS.PRICE_TO_EARNING_RATES:
                return stockValues.sort(
                    (a, b) => b.priceToEarningRate - a.priceToEarningRate
                );
            case Caching.CALCULATIONS.PRICE_TO_BOOK_RATES:
                return stockValues.sort(
                    (a, b) => b.priceToBookRate - a.priceToBookRate
                );
            case Caching.CALCULATIONS.EBITDA:
                return stockValues
                    .map((stockJson) => {
                        if (!stockJson?.ebitda) {
                            stockJson.ebitda = {
                                raw: this.#defaultNegative,
                            };
                        }
                        return stockJson;
                    }).sort((a, b) => a.ebitda.raw - b.ebitda.raw);

            case Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES:
                return stockValues
                    .map((stockJson) => {
                        if (!stockJson?.debtToEquity) {
                            stockJson.debtToEquity = {
                                raw: this.#defaultNegative,
                            };
                        }
                        return stockJson;
                    }).sort((a, b) => a.debtToEquity.raw - b.debtToEquity.raw);

            case Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES:
                return stockValues
                    .map((stockJson) => {
                        if (!stockJson?.returnOnEquity) {
                            stockJson.returnOnEquity = {
                                raw: this.#defaultNegative,
                            };
                        }
                        return stockJson;
                    }).sort((a, b) => a.returnOnEquity.raw - b.returnOnEquity.raw);
            default:
                break;
        }
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} grahamNumbers graham numbers per each stock we calculate.
     */
    sortStocksByGrahamNumber(stockValues) {
        const result = this.sortStockValues(
            stockValues,
            Caching.CALCULATIONS.GRAHAM_NUMBERS
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToEarningRates price/earning rate values per stock we calculate.
     */
    sortStocksByPriceToEarningRates(stockValues) {
        const result = this.sortStockValues(
            stockValues,
            Caching.CALCULATIONS.PRICE_TO_EARNING_RATES
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues values we get from api
     * @param {Array} priceToBookRates price/book rate values per stock we calculate.
     */
    sortStocksByPriceToBookRates(stockValues) {
        const result = this.sortStockValues(
            stockValues,
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
        // const filteredStockValues = stockValues.map((stockJson) => {
        //     if (!stockJson?.returnOnEquity) {
        //         stockJson.returnOnEquity = {
        //             raw: this.#defaultNegative,
        //         };
        //     }
        //     return stockJson;
        // });
        // const sortedStockValues = filteredStockValues.sort(
        //     (a, b) => a.returnOnEquity.raw - b.returnOnEquity.raw
        // );

        // return sortedStockValues;
        const result = this.sortStockValues(
            stockValues,
            Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES
        );
        return result;
    }
    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByDebtToEquities(stockValues) {
        // const filteredStockValues = stockValues.map((stockJson) => {
        //     if (!stockJson?.debtToEquity) {
        //         stockJson.debtToEquity = {
        //             raw: this.defaultPositive,
        //         };
        //     }
        //     return stockJson;
        // });

        // const sortedStockValues = filteredStockValues.sort(
        //     (a, b) => a.debtToEquity.raw - b.debtToEquity.raw
        // );

        // return sortedStockValues;
        const result = this.sortStockValues(
            stockValues,
            Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES
        );
        return result;
    }

    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByEbitda(stockValues) {
        const result = this.sortStockValues(
            stockValues,
            Caching.CALCULATIONS.PRICE_TO_BOOK_RATES
        );
        return result;
    }

    /**
     *
     * @param {Array} stockValues stock values we get from api
     * @param {Object} calculations arrays of values per each stock choosing formulas we get from the Calculation Service.
     * @returns
     */
    sortStocksByValues(stockValues) {
        const stockValuesSortedByGraham =
            this.sortStocksByGrahamNumber(stockValues);
        const stockValuesSortedByPriceToEarningRates =
            this.sortStocksByPriceToEarningRates(stockValues);
        const stockValuesSortedByPriceToBookRates =
            this.sortStocksByPriceToBookRates(stockValues);

        const sortedStocks = {
            graham: stockValuesSortedByGraham,
            priceToEarningRates: stockValuesSortedByPriceToEarningRates,
            priceToBookRates: stockValuesSortedByPriceToBookRates,
            returnOnEquityRates: '',
            debtToEquities: '',
            ebitdaValues: '',
        };
        return sortedStocks;
    }
}

export default new StockHelper();
