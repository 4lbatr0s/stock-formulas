import urlConstants from 'utils/constants/url';

class UrlHelper {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL; // Use the base URL from your environment variables
  }

  getCalculatedRatiosUrl(query) {
    return `${this.baseUrl}${urlConstants.getCalculatedRatios}${query}`;
  }

  getStocksData(stockSymbol) {
    return `${this.baseUrl}${urlConstants.getStocksData}/${stockSymbol}`;
  }

  getStocksNews(stockSymbol) {
    return `${this.baseUrl}${urlConstants.getStocksNews}/${stockSymbol}`;
  }
  getNewsById(newsId) {
    return `${this.baseUrl}${urlConstants.getNewsById}/${newsId}`;
  }
  getUserDetails() {
    return `${this.baseUrl}${urlConstants.getUserDetails}`;
  }
  getHistoricalDataByStock(stockSymbol) {
    return `${this.baseUrl}${urlConstants.getHistoricalDataByStock}/${stockSymbol}`;
  }
  register() {
    return `${this.baseUrl}${urlConstants.register}`;
  }
  login() {
    return `${this.baseUrl}${urlConstants.login}`;
  }
  logout() {
    return `${this.baseUrl}${urlConstants.logout}`;
  }
  refreshToken() {
    return `${this.baseUrl}${urlConstants.refreshToken}`;
  }
}

export default new UrlHelper();
