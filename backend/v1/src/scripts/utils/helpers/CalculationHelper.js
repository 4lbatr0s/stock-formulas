import StockHelper from "./StockHelper.js";

class CalculationHelper {
  calculatePriceToBookRate(jsonValueFromYahoo, jsonValueFromFinnhub) {
    let currentPrice = jsonValueFromYahoo.currentPrice;
    let bookValue = StockHelper.getBookValue(
      jsonValueFromYahoo,
      jsonValueFromFinnhub
    );
    return (currentPrice / bookValue) || null;
  }

  calculatePriceToEarningRate(jsonValueFromYahoo, jsonValueFromFinnhub) {
    let epsRate = StockHelper.getEpsRate(jsonValueFromYahoo, jsonValueFromFinnhub);
    let currentPrice = jsonValueFromYahoo.currentPrice;

    return epsRate / currentPrice || null;
  }

  calculatePriceToSalesRate(jsonValueFromYahoo, jsonValueFromFinnhub) {
      const salesPerShare = StockHelper.getSalesPerShare(jsonValueFromYahoo, jsonValueFromFinnhub);
      const currentPrice = StockHelper.getMarketPricePerShare(jsonValueFromYahoo, jsonValueFromFinnhub);
      return (currentPrice / salesPerShare) || null;
  }

  calculateReturnOnEquityRate(jsonValue, financialValues) {
    if ("trailingEps" in jsonValue && "currentPrice" in jsonValue) {
      const currentPrice = jsonValue.currentPrice;
      const trailingEps = jsonValue.trailingEps;
      return currentPrice / trailingEps;
    }
    return null;
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
      factors.push({
        name: "Price-to-Book Ratio",
        value: 1 / stock.priceToBookRate,
      });
      weights.push(0.2);
    }

    if (stock.priceToEarningRate !== null) {
      factors.push({
        name: "Price-to-Earning Ratio",
        value: stock.priceToEarningRate,
      });
      weights.push(0.2);
    }

    if (stock.grahamNumber !== null) {
      factors.push({ name: "Graham Number", value: 1 / stock.grahamNumber });
      weights.push(0.15);
    }

    if (stock.debtToEquity !== null) {
      factors.push({
        name: "Debt-to-Equity Ratio",
        value: 1 / stock.debtToEquity,
      });
      weights.push(0.15);
    }

    if (stock.ebitdaMargins !== null) {
      factors.push({ name: "EBITDA Margin", value: stock.ebitdaMargins });
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

    let weightedSum = weightedFactors
      .filter((value) => !isNaN(value))
      .reduce((acc, val) => acc + val, 0);
    const score = Number(weightedSum / totalWeight).toFixed(3);
    return score;
  }

  /**
   * @param {Object} stockJson
   * @returns overall value of the stocks in the stockJson array.
   */
  allOverallValues(stockArray) {
    for (let i = 0; i < stockArray.length; i++) {
      let stock = stockArray[i];
      const overallScore = this.calculateOverallScorePerStock(stock);
      stock.overallScore = parseFloat(Number(overallScore).toFixed(3));
    }
  }

  getOrCalculateDebtToEquity(stockJson) {}
}

export default new CalculationHelper();
