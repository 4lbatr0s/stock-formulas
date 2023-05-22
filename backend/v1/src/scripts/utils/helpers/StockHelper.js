import CalculationHelper from "./CalculationHelper.js";
import redisClient from "../../../config/caching/redisConfig.js";
import Caching from "../constants/Caching.js";

class StockHelper {
  getFromYahooFinancial = async (json, properties) => {
    try {
      const financialValues = JSON.parse(
        await redisClient.get(Caching.BIST100_SP500_FINANCIALS)
      );
      const stock = financialValues[json.symbol];
      const propertiesToReturn = {};

      for (const property of properties) {
        propertiesToReturn[property] = stock[property];
      }

      return propertiesToReturn;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  getFromFinnhubFinancial = async (json, properties) => {
    try {
      const financialValues = JSON.parse(
        await redisClient.get(Caching.BIST100_SP500_FINANCIALS)
      );
      const stock = financialValues[json.symbol];
      const propertiesToReturn = {};

      for (const property of properties) {
        propertiesToReturn[property] = stock[property];
      }

      return propertiesToReturn;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  getPriceToBookRate(json) {
    if (json.hasOwnProperty("priceToBook")) {
      return json.priceToBook;
    }

    const finnhubStocksArray = this.getFromFinnhubFinancial(json, [
      "pbQuarterly",
    ]);
    if (finnhubStocksArray.hasOwnProperty("pbQuarterly"))
      return finnhubStocksArray.pbQuarterly;

    const calculatedPriceToBookRate =
      CalculationHelper.calculatePriceToBookRate(json, finnhubStocksArray);
    return calculatedPriceToBookRate;
  }

  getPriceToEarningRate(json) {
    if (json.hasOwnProperty("trailingPE")) {
      return json.trailingPE;
    }
    const finnhubStocksArray = this.getFromFinnhubFinancial(json, [
      "peTTM",
      "peAnnual",
    ]);
    let peRate = finnhubStocksArray.peTTM || finnhubStocksArray.peAnnual;
    if (peRate) return peRate;
    return CalculationHelper.calculatePriceToEarningRate(
      json,
      finnhubStocksArray
    );
  }

  getPriceToSalesRate(json) {
    if (json.hasOwnProperty("priceToSalesTrailing12Months")) {
      return json.priceToSalesTrailing12Months;
    }
    const finnhubStocksArray = this.getFromFinnhubFinancial(json, [
      "psTTM",
      "psAnnual",
    ]);

    let psRate = finnhubStocksArray.psTTM || finnhubStocksArray.psAnnual;
    return psRate || null;
  }

  getDebtToEquityRate(json) {
    if (json.hasOwnProperty("debtToEquity")) {
      return json.debtToEquity;
    }
    const financialValues = this.getFromYahooFinancial(json, ["debtToEquity"]);
    if ("debtToEquity" in financialValues) {
      return financialValues.debtToEquity.raw;
    }
    return null;
  }
  getReturnOnEquityRate(json) {
    if (json.hasOwnProperty("returnOnEquity")) {
      return json.returnOnEquity;
    }
    const financialValues = this.getFromYahooFinancial(json, [
      "returnOnEquity",
    ]);
    if ("returnOnEquity" in financialValues) {
      return financialValues.returnOnEquity.raw;
    } else {
      return CalculationHelper.calculateReturnOnEquityRate(
        json,
        financialValues
      );
    }
  }

  getEbitda(json) {
    if (json.hasOwnProperty("ebitda")) {
      return json.ebitda;
    }
    const financialValues = this.getFromYahooFinancial(json, ["ebitda"]);
    if ("ebitda" in financialValues) {
      return financialValues.ebitda.raw;
    }
    return null;
  }

  getEbitdaMargins(json) {
    if (json.hasOwnProperty("ebitdaMargins")) {
      return json.ebitdaMargins;
    }
    const financialValues = this.getFromYahooFinancial(json, ["ebitdaMargins"]);
    if ("ebitdaMargins" in financialValues) {
      return financialValues.ebitdaMargins.raw;
    }
    return null;
  }

  getBookValue(yahooJson, finnhubJson) {
    let bookValue =
      yahooJson?.bookValue || finnhubJson?.bookValuePerShareAnnual;
    return bookValue || null;
  }

  getEpsRate(yahooJson, finnhubJson) {
    let epsRate = yahooJson.trailingEps || finnhubJson.epsAnnual;
    return epsRate || null;
  }

  getAskPropertiesFromYfinance(jsonSource) {
    const filteredArray = jsonSource.map((json) => {
      return {
        name: json.shortName,
        symbol: json.underlyingSymbol,
        priceToBookRate: parseFloat(
          Number(this.getPriceToBookRate(json)).toFixed(3)
        ),
        priceToEarningRate: parseFloat(
          Number(this.getPriceToEarningRate(json)).toFixed(3)
        ),
        priceToSalesRate: parseFloat(
          Number(this.getPriceToSalesRate(json)).toFixed(3)
        ),
        // debtToEquityRate: parseFloat(
        //   Number(this.getDebtToEquityRate(json)).toFixed(3)
        // ),
        // returnOnEquityRate: parseFloat(
        //   Number(this.getReturnOnEquityRate(json)).toFixed(3)
        // ),
        // ebitda: parseFloat(Number(this.getEbitda(json))),
        // ebitdaMargins: parseFloat(
        //   Number(this.getEbitdaMargins(json)).toFixed(3)
        // ),
      };
    });
    return filteredArray;
  }
}

export default new StockHelper();
