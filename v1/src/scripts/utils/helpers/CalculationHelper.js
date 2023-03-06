class CalculationHelper {
    constructor() {}

    /**
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns Graham number of the stock
     */
    grahamNumber(stockJson) {
        const epsTrailingExistsAndNumber =
            stockJson?.epsTrailingTwelveMonths &&
            typeof stockJson.epsTrailingTwelveMonths === 'number';
        const bookValueExistAndNumber =
            stockJson?.bookValue && typeof stockJson.bookValue === 'number';
        if (!epsTrailingExistsAndNumber || !bookValueExistAndNumber) return '';
        return Math.sqrt(
            stockJson.epsTrailingTwelveMonths * stockJson.bookValue * 22.5
        );
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
            return '';
        return Math.fround(
            stockJson.regularMarketPrice / stockJson.epsTrailingTwelveMonths
        );
    }
    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns price to book value for the stock.
     */
    priceToBookRate(stockJson) {
        const bookValueExistAndNumber =
            stockJson?.bookValue &&
            typeof stockJson.bookValue === 'number';
        const regularMarketPriceExistsAndNumber =
            stockJson?.regularMarketPrice &&
            typeof stockJson.regularMarketPrice === 'number';
        if (!bookValueExistAndNumber || !regularMarketPriceExistsAndNumber)
            return '';
        return Math.fround(
            stockJson.regularMarketPrice / stockJson.bookValue
        );
    }
}

export default new CalculationHelper();
