import ApiHelper from "./ApiHelper.js";
import UrlHelper from "./UrlHelper.js";

class StockHelper {
  async getAskPropertiesFromYfinance(jsonSource) {
    const filteredArray = await Promise.all(
      jsonSource.map((json) => this.bringValues(json))
    );
    return filteredArray;
  }

  async getCurrentPricesFromYFinance(symbols) {
    const batches = symbols.map(maps);
    const result = await ApiHelper.getStockInfoAsync(
      UrlHelper.getYFinanceBist500Url(symbols)
    );
    return result;
  }
}

export default new StockHelper();
