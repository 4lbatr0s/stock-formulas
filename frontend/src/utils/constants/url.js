const urlConstants = {
  getCalculatedRatios: '/stocks/multiple/get-calculated-ratios',
  getStocksData: '/stocks',
  news: '/news',
  getStocksNews: '/news/all-news', // Corrected the URL construction
  getNewsById: '/news/single',
  getHistoricalDataByStock: '/stocks/historical-data',
  register: '/authentication/register',
  login: '/authentication/login',
  getUsers:'/users'
};
export default Object.freeze(urlConstants);
