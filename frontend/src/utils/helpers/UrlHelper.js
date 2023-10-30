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
  getUserById(userId){
    return `${this.baseUrl}${urlConstants.getUsers}/${userId}`;
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
}

export default new UrlHelper();
