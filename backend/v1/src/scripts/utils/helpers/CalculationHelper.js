class CalculationHelper {
    #defaultPositive = 999999999999999;
    #defaultNegative = -999999999999999;
    constructor() {
    }

    /**
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns Graham number of the stock
     */

    // TODO: Refactor and abstraction.
    calculateTheFormula(stockJson, formula){
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

    grahamNumber(stockJson) {
        const epsTrailingExistsAndNumber =
            stockJson?.epsTrailingTwelveMonths &&
            typeof stockJson.epsTrailingTwelveMonths === 'number';
        const bookValueExistAndNumber =
            stockJson?.bookValue && typeof stockJson.bookValue === 'number';
        if (!epsTrailingExistsAndNumber || !bookValueExistAndNumber) return this.#defaultPositive;
        const result =Math.sqrt(
            stockJson.epsTrailingTwelveMonths * stockJson.bookValue * 22.5
        );
        stockJson.grahamNumber = result;  
        return result;
    }
    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns Earning per share value of the stock.
     */
    priceToEarningRate(stockJson) {
        const epsTrailingExistsAndNumber =
            stockJson?.epsTrailingTwelveMonths &&
            typeof stockJson.epsTrailingTwelveMonths === 'number';
        const regularMarketPriceExistsAndNumber =
            stockJson?.regularMarketPrice &&
            typeof stockJson.regularMarketPrice === 'number';
        if (!epsTrailingExistsAndNumber || !regularMarketPriceExistsAndNumber)
            return this.#defaultPositive;

        const result = Math.fround(
            stockJson.regularMarketPrice / stockJson.epsTrailingTwelveMonths
        );
        stockJson.priceToEarningRate = result;
        return result;
    }
    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns price to book value for the stock.
     */
    priceToBookRate(stockJson) {
        const bookValueExistAndNumber =
            stockJson?.bookValue && typeof stockJson.bookValue === 'number';
        const regularMarketPriceExistsAndNumber =
            stockJson?.regularMarketPrice &&
            typeof stockJson.regularMarketPrice === 'number';
        if (!bookValueExistAndNumber || !regularMarketPriceExistsAndNumber)
            return this.#defaultPositive;
        const result = Math.fround(stockJson.regularMarketPrice / stockJson.bookValue);
        stockJson.priceToBookRate = result;
        return result;
    }
}

export default new CalculationHelper();
