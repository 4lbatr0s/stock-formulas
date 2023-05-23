import CalculationHelper from "./CalculationHelper.js";
import redisClient from "../../../config/caching/redisConfig.js";
import Caching from "../constants/Caching.js";

class StockHelper {
  getFromYahooFinancial = async (json, properties) => {
    try {
      const financialValues = JSON.parse(
        redisClient.get(Caching.BIST100_SP500_FINANCIALS)
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

  async getFromFinnhubFinancial(json, properties) {
    try {
      const financialValues = await redisClient.get(
        Caching.BIST100_SP500_FINANCIALS
      );
      const stock = JSON.parse(financialValues)[json.symbol];
      const propertiesToReturn = {};

      for (const property of properties) {
        propertiesToReturn[property] = stock[property];
      }
      return propertiesToReturn;
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  async getPriceToBookRate(json) {
    if (json.hasOwnProperty("priceToBook")) {
      return json.priceToBook;
    }

    const finnhubStocksArray = await this.getFromFinnhubFinancial(json, [
      "pbQuarterly",
    ]);
    return (
      finnhubStocksArray?.pbQuarterly ||
      CalculationHelper.calculatePriceToBookRate(json, finnhubStocksArray)
    );
  }

  async getPriceToEarningRate(json) {
    if (json.hasOwnProperty("trailingPE")) {
      return json.trailingPE;
    }

    const finnhubStocksArray = await this.getFromFinnhubFinancial(json, [
      "peTTM",
      "peAnnual",
    ]);

    return (
      finnhubStocksArray?.peTTM ||
      finnhubStocksArray?.peAnnual ||
      CalculationHelper.calculatePriceToEarningRate(json, finnhubStocksArray)
    );
  }

  async getPriceToSalesRate(json) {
    if (json.hasOwnProperty("priceToSalesTrailing12Months")) {
      return json.priceToSalesTrailing12Months;
    }

    const finnhubStocksArray = await this.getFromFinnhubFinancial(json, [
      "psTTM",
      "psAnnual",
    ]);

    return (
      finnhubStocksArray?.psTTM ||
      finnhubStocksArray?.psAnnual ||
      CalculationHelper.calculatePriceToSalesRate(json, finnhubStocksArray)
    );
  }

  async getDebtToEquityRate(json) {
    if (json?.debtToEquity) {
      return json.debtToEquity;
    }

    const financialValues = await this.getFromFinnhubFinancial(json, [
      "totalDebt/totalEquityQuarterly",
    ]);

    return financialValues?.["totalDebt/totalEquityQuarterly"] || null;
  }

  async getReturnOnEquityRate(json) {
    if (json?.returnOnEquity) {
      return json.returnOnEquity * 100;
    }

    const financialValues = await this.getFromFinnhubFinancial(json, [
      "roeTTM",
    ]);

    return financialValues?.roeTTM || null;
  }

  getEbitda(json) {
    let ebitda = json?.ebitda;
    return ebitda || null;
  }

  getEbitdaMargins(json) {
    let ebitdaMargins = json?.ebitdaMargins;
    return ebitdaMargins || null;
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

  getMarketPricePerShare(yahooJson, finnhubJson) {
    if ("currentPrice" in yahooJson) return yahooJson.currentPrice;
    return null;
  }

  getSalesPerShare(yahooJson, finnhubJson) {
    let salesPerShare = yahooJson?.totalRevenue / yahooJson?.sharesOutstanding;
    if (salesPerShare) return salesPerShare;
    return null;
  }

  async bringValues(jsonSource) {
    const result = {
      name: jsonSource.shortName,
      symbol: jsonSource.underlyingSymbol,
      priceToBookRate: parseFloat(
        Number(await this.getPriceToBookRate(jsonSource)).toFixed(3)
      ),
      priceToEarningRate: parseFloat(
        Number(await this.getPriceToEarningRate(jsonSource)).toFixed(3)
      ),
      priceToSalesRate: parseFloat(
        Number(await this.getPriceToSalesRate(jsonSource)).toFixed(3)
      ),
      debtToEquityRate: parseFloat(
        Number(await this.getDebtToEquityRate(jsonSource)).toFixed(3)
      ),
      returnOnEquityRate: parseFloat(
        Number(await this.getReturnOnEquityRate(jsonSource)).toFixed(3)
      ),
      ebitda: parseFloat(Number(this.getEbitda(jsonSource))),
      ebitdaMargins: parseFloat(
        Number(await this.getEbitdaMargins(jsonSource)).toFixed(3)
      ),
    };
    return result;
  }
  
  async getAskPropertiesFromYfinance(jsonSource) {
    const filteredArray = await Promise.all(jsonSource.map(json => this.bringValues(json)));
    return filteredArray;
  }
  
}

export default new StockHelper();
