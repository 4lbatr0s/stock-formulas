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
            stockJson?.bookValue && typeof stockJson.bookValue === 'number';
        const regularMarketPriceExistsAndNumber =
            stockJson?.regularMarketPrice &&
            typeof stockJson.regularMarketPrice === 'number';
        if (!bookValueExistAndNumber || !regularMarketPriceExistsAndNumber)
            return '';
        return Math.fround(stockJson.regularMarketPrice / stockJson.bookValue);
    }
    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns returns the return on equity value of the stock
     */
    returnOnEquity(stockJson) {
        const netIncomeValueExistsAndNumber =
            stockJson?.netIncome && typeof stockJson.netIncome === 'number';
        const shareHoldersEquityExistsAndNumber =
            stockJson?.shareHoldersEquity &&
            typeof stockJson.shareHoldersEquity === 'number';
        if (
            !netIncomeValueExistsAndNumber ||
            !shareHoldersEquityExistsAndNumber
        )
            return '';
        return Math.fround(stockJson.netIncome / stockJson.bookValue);
    }

    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns returns the price to sales rate of the stock
     */
    priceToSalesRate(stockJson) {
        const marketCapExistsAndNumber =
            stockJson?.marketCap && typeof stockJson.marketCap === 'number';
        const totalRevenueExistsAndNumber =
            stockJson?.shareHoldersEquity &&
            typeof stockJson.shareHoldersEquity === 'number';
        if (!marketCapExistsAndNumber || !totalRevenueExistsAndNumber)
            return '';
        return Math.fround(stockJson.marketCap / stockJson.totalRevenue);
    }

    /**
     *
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns returns the debt to equity ratio of the stock.
     */
    debtToEquity(stockJson) {
        const totalDebtExistsAndNumber =
            stockJson?.totalDebt && typeof stockJson.totalDebt === 'number';
        const shareHoldersEquity =
            stockJson?.shareHoldersEquity &&
            typeof stockJson.shareHoldersEquity === 'number';
        if (!totalDebtExistsAndNumber || !shareHoldersEquity)
            return '';
        return Math.fround(stockJson.totalDebt / stockJson.shareHoldersEquity);
    }
}

export default new CalculationHelper();
