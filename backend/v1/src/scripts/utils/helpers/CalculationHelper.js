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
        const { priceToBookRate, priceToEarningRate, grahamNumber, debtToEquity, ebitda, returnOnEquity } = stock;
        console.log("stock:",stock);
        const grahamWeight = 0.1;
        const pbrWeight = 0.2;
        const perWeight = 0.2;
        const dteWeight = 0.15;
        const ebitdaWeight = 0.25;
        const roeWeight = 0.1;
        
        const grahamScore = grahamNumber ?  1 / grahamNumber : 0;
        const pbrScore = priceToBookRate ? 1 / priceToBookRate : 0;
        const perScore = priceToEarningRate ? 1 / priceToEarningRate : 0;
        const dteScore = debtToEquity ? 1/debtToEquity : 0;
        const ebitdaScore = ebitda ? 1 / ebitda : 0;
        const roeScore = returnOnEquity ? 1 / returnOnEquity : 0;
        
        const weightedScoresSum = 
          grahamScore * grahamWeight +
          pbrScore * pbrWeight +
          perScore * perWeight +
          dteScore * dteWeight +
          ebitdaScore * ebitdaWeight +
          roeScore * roeWeight;

        console.log("weightedScoresSum:",weightedScoresSum);
    
        return weightedScoresSum;
      }
       

    /**
     * @param {Object} stockJson 
     * @returns overall value of the stocks in the stockJson array.
     */
    allOverallValues(stockArray) {
        for(let i=0; i<stockArray.length; i++){
            let stock = stockArray[i];
            const overallScore = this.calculateOverallScorePerStock(stock);
            stock.overallScore = overallScore;
            console.log("stock:", stock);
        }
    }
}

export default new CalculationHelper();
