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
                    })
                    .sort((a, b) => a.ebitda.raw - b.ebitda.raw);

            case Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES:
                return stockValues
                    .map((stockJson) => {
                        if (!stockJson?.debtToEquity) {
                            stockJson.debtToEquity = {
                                raw: this.#defaultNegative,
                            };
                        }
                        return stockJson;
                    })
                    .sort((a, b) => a.debtToEquity.raw - b.debtToEquity.raw);

            case Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES:
                return stockValues
                    .map((stockJson) => {
                        if (!stockJson?.returnOnEquity) {
                            stockJson.returnOnEquity = {
                                raw: this.#defaultNegative,
                            };
                        }
                        return stockJson;
                    })
                    .sort(
                        (a, b) => a.returnOnEquity.raw - b.returnOnEquity.raw
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
    sortStocksByGrahamNumber(stockValues) {
        const grahamStocks = [...stockValues];
        const result = this.sortStockValues(
            grahamStocks,
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
        const priceToEarningStocks = [...stockValues];
        const result = this.sortStockValues(
            priceToEarningStocks,
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
        const priceToBookRatesStocks = [...stockValues];
        const result = this.sortStockValues(
            priceToBookRatesStocks,
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
        const returnOnEquitiesStock = [...stockValues];
        const result = this.sortStockValues(
            returnOnEquitiesStock,
            Caching.CALCULATIONS.RETURN_ON_EQUITY_RATES
        );
    }
    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByDebtToEquities(stockValues) {
        const debtToEquitiesStocks = [...stockValues];
        const result = this.sortStockValues(
            debtToEquitiesStocks,
            Caching.CALCULATIONS.DEBT_TO_EQUITY_RATES
        );
    }

    /**
     * @param {Array} stockValues values we get from api
     * @param {Array} debtToEquities debt/equity value per stock we calculate.
     */
    sortStocksByEbitda(stockValues) {
        const ebitdaStocks = [...stockValues];
        const result = this.sortStockValues(
            ebitdaStocks,
            Caching.CALCULATIONS.PRICE_TO_BOOK_RATES
        );
    }

    getAskedPropertiesFromJson(jsonSource, destination) {
        const symbolMap = new Map();
        const updatedJsonArray = [];
      
        // Create a map of symbols to objects from the jsonSource array
        for (const json of jsonSource) {
          symbolMap.set(json.symbol, {
            debtToEquity: json.debtToEquity.raw,
            returnOnEquity: json.returnOnEquity.raw,
            ebitda: json.ebitda.raw,
          });
        }
      
        // Iterate through the destination array and add properties to matching objects
        for (const obj of destination) {
          const symbolObj = symbolMap.get(obj.stockName);
          if (symbolObj) {
            const updatedObj = {...obj, ...symbolObj};
            delete updatedObj.symbol;
            updatedJsonArray.push(updatedObj);
          }
        }
      
        return updatedJsonArray;
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
