import StockHelper from "./StockHelper.js";
import overallScoreWeights from "../constants/OverallScoreWeights.js";

class CalculationHelper {
  calculatePriceToBookRate(jsonValueFromYahoo, jsonValueFromFinnhub) {
    let currentPrice = jsonValueFromYahoo.currentPrice;
    let bookValue = StockHelper.getBookValue(
      jsonValueFromYahoo,
      jsonValueFromFinnhub
    );
    return currentPrice / bookValue || null;
  }

  async calculatePriceToEarningRate(jsonValueFromYahoo) {
    let epsRate = await StockHelper.getEpsRate(jsonValueFromYahoo);
    let currentPrice = jsonValueFromYahoo.currentPrice;

    return epsRate / currentPrice || null;
  }

  calculatePriceToSalesRate(jsonValueFromYahoo, jsonValueFromFinnhub) {
    const salesPerShare = StockHelper.getSalesPerShare(
      jsonValueFromYahoo,
      jsonValueFromFinnhub
    );
    const currentPrice = StockHelper.getMarketPricePerShare(
      jsonValueFromYahoo,
      jsonValueFromFinnhub
    );
    return currentPrice / salesPerShare || null;
  }

  calculateReturnOnEquityRate(jsonValue, financialValues) {
    if ("trailingEps" in jsonValue && "currentPrice" in jsonValue) {
      const currentPrice = jsonValue.currentPrice;
      const trailingEps = jsonValue.trailingEps;
      return currentPrice / trailingEps;
    }
    return null;
  }

  calculateEarningsPerShare(jsonValue) {
    if ("netIncomeToCommon" in jsonValue && "sharesOutstanding" in jsonValue) {
      const netIncomeToCommon = jsonValue.netIncomeToCommon;
      const sharesOutstanding = jsonValue.sharesOutstanding;
      return netIncomeToCommon / sharesOutstanding;
    }
    return null;
  }

  calculateDividendYield(jsonValue) {
    if (
      "trailingAnnualDividendRate" in jsonValue &&
      "currentPrice" in jsonValue
    ) {
      const trailingAnnualDividendRate = jsonValue.trailingAnnualDividendRate;
      const currentPrice = jsonValue.currentPrice;
      return trailingAnnualDividendRate / currentPrice;
    }
    return null;
  }

  /**
   * @param {Object} stock
   * @param {Object} propertyMinMax - Object containing the min and max values for each property
   * @returns {number} - Calculated overall value for a stock object
   */
  calculateOverallScorePerStock(stock, propertyMinMax) {
    const factors = [];
    const weights = [];
    if (stock.priceToBookRate !== null) {
      factors.push({
        name: "Price-to-Book Ratio",
        value: this.normalizeValue(
          stock.priceToBookRate,
          "priceToBookRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.priceToBookRate);
    }

    // Add conditions for other ratios based on the desired flow

    if (stock.priceToEarningRate !== null) {
      factors.push({
        name: "Price-to-Earning Ratio",
        value: this.normalizeValue(
          stock.priceToBookRate,
          "priceToEarningRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.priceToEarningRate);
    }
    if (stock.priceToSalesRate !== null) {
      factors.push({
        name: "Price-to-Sales Ratio",
        value: this.normalizeValue(
          stock.priceToBookRate,
          "priceToSalesRate",
          propertyMinMax
        ),
      });
      weights.push(0.15);
    }

    if (stock.debtToEquityRate !== null) {
      factors.push({
        name: "Debt-to-Equity Ratio",
        value: this.normalizeValue(
          stock.debtToEquityRate,
          "debtToEquityRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.debtToEquityRate);
    }

    if (stock.ebitdaMargins !== null) {
      factors.push({
        name: "EBITDA Margin",
        value: this.normalizeValue(
          stock.ebitdaMargins,
          "ebitdaMargins",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.ebitdaMarginsRate);
    }

    if (stock.returnOnEquityRate !== null) {
      factors.push({
        name: "Return on Equity",
        value: this.normalizeValue(
          stock.returnOnEquityRate,
          "returnOnEquityRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.returnOnEquityRate);
    }

    if (stock.earningsPerShareRate !== null) {
      factors.push({
        name: "Earnings Per Share",
        value: this.normalizeValue(
          stock.earningsPerShareRate,
          "earningsPerShareRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.earningsPerShareRate);
    }
    if (stock.dividendYieldsRate !== null) {
      factors.push({
        name: "Dividend Yields",
        value: this.normalizeValue(
          stock.dividendYieldsRate,
          "dividendYieldsRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.dividendYieldsRate);
    }
    if (stock.returnOnAssetsRate !== null) {
      factors.push({
        name: "Return On Assets",
        value: this.normalizeValue(
          stock.returnOnAssetsRate,
          "returnOnAssetsRate",
          propertyMinMax
        ),
      });
      weights.push(overallScoreWeights.returnOnAssetsRate);
    }

    // Calculate the sum of weights of available ratios
    const sumOfWeights = weights.reduce((acc, val) => acc + val, 0);

    // Adjust the weights based on the available ratios
    const adjustedWeights = weights.map((weight) => weight / sumOfWeights);

    // Calculate the weighted sum
    const weightedSum = factors
      .map((factor, i) => factor.value * adjustedWeights[i])
      .reduce((acc, val) => acc + val, 0);

    // Calculate the overall score
    const score = Number(weightedSum).toFixed(3);
    return score;
  }

  calculatePropertyMinMax(stockArray) {
    const properties = [
      "priceToBookRate",
      "priceToSalesRate",
      "priceToEarningRate",
      "debtToEquityRate",
      "returnOnEquityRate",
      "ebitdaMargins",
      "dividendYieldsRate",
      "earningsPerShareRate",
      "returnOnAssetsRate",
    ];
    const propertyMinMax = {};

    for (let property of properties) {
      let min = Infinity;
      let max = -Infinity;

      for (let json of stockArray) {
        let value = json[property];

        if (typeof value === "number" && isFinite(value)) {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }

      propertyMinMax[property] = {
        min: min,
        max: max,
      };
    }

    console.log("propertyMinMax:", propertyMinMax);
    return propertyMinMax;
  }

  normalizeValue(value, property, maxMinProperties) {
    const minValue = maxMinProperties[property].min;
    const maxValue = maxMinProperties[property].max;
    let normalizedValue;
    if (value < 0) {
      // Rule 1: For negative values, the smaller the value, the closer to -1
      normalizedValue = -1 + (value - minValue) / (maxValue - minValue);
    } else if (
      [
        "priceToBookRate",
        "priceToSalesRate",
        "priceToEarningRate",
        "debtToEquityRate",
      ].includes(property)
    ) {
      // Rule 2: For specific properties with values >= 0, closer to 0 means closer to 1
      normalizedValue = 1 - (value - minValue) / (maxValue - minValue);
    } else if (
      [
        "ebitdaMargins",
        "returnOnEquityRate",
        "dividendYieldsRate, earningsPerShareRate, returnOnAssetsRate",
      ].includes(property)
    ) {
      // Rule 3: For specific properties with values > 0 or equal to 0, closer to 1 means a higher value
      normalizedValue = value / maxValue;
    } else {
      // For any other properties, return the original value
      return value;
    }
    return normalizedValue;
  }

  /**
   * @param {Object} stockJson
   * @returns overall value of the stocks in the stockJson array.
   */
  allOverallValues(stockArray) {
    const propertyMinMax = this.calculatePropertyMinMax(stockArray);
    for (let i = 0; i < stockArray.length; i++) {
      let stock = stockArray[i];
      const overallScore = this.calculateOverallScorePerStock(
        stock,
        propertyMinMax
      );
      stock.overallScore = parseFloat(Number(overallScore).toFixed(3));
    }
  }
}

export default new CalculationHelper();
