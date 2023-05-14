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

    /**
     * 
     * @param {Object} stock 
     * @returns calculated overall value for a stock object.
     */
    calculateOverallScorePerStock(stock) {
        let factors = [];
        let weights = [];
      
        if (stock.priceToBookRate !== null) {
          factors.push({ name: "Price-to-Book Ratio", value: 1 / stock.priceToBookRate });
          weights.push(0.2);
        }
      
        if (stock.priceToEarningRate !== null) {
          factors.push({ name: "Price-to-Earning Ratio", value: stock.priceToEarningRate });
          weights.push(0.2);
        }
      
        if (stock.grahamNumber !== null) {
          factors.push({ name: "Graham Number", value: 1 / stock.grahamNumber });
          weights.push(0.15);
        }
      
        if (stock.debtToEquity !== null) {
          factors.push({ name: "Debt-to-Equity Ratio", value: 1 / stock.debtToEquity });
          weights.push(0.15);
        }
      
        if (stock.ebitdaMargins !== null) {
          factors.push({ name: "EBITDA Margin", value:stock.ebitdaMargins });
          weights.push(0.15);
        }
      
        if (stock.returnOnEquity !== null) {
          factors.push({ name: "Return on Equity", value: stock.returnOnEquity });
          weights.push(0.15);
        }
      
        let totalWeight = weights.reduce((acc, val) => acc + val, 0);
        let weightedFactors = factors.map((factor, i) => factor.value * weights[i]);
      
        if (totalWeight === 0) {
          return 0;
        }
      
        let weightedSum = weightedFactors.filter(value=> !isNaN(value)).reduce((acc, val) => acc + val, 0);
        const score = Number(weightedSum / totalWeight).toFixed(3);
        return score;
      }
      

    /**
     * @param {Object} stockJson 
     * @returns overall value of the stocks in the stockJson array.
     */
    allOverallValues(stockArray) {
        for(let i=0; i<stockArray.length; i++){
            let stock = stockArray[i];
            const overallScore = this.calculateOverallScorePerStock(stock);
            stock.overallScore = parseFloat(Number(overallScore).toFixed(3));
        }
    }
}

export default new CalculationHelper();
