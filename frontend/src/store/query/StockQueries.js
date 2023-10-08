import { stockIsLoading, stockSetNewPrice, stockIsError } from 'store/reducers/stock';
import AxiosHelper from 'utils/helpers/AxiosHelper';
import UrlHelper from 'utils/helpers/UrlHelper';

export const fetchStockInformationsQuery = async (query) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getCalculatedRatiosUrl(query));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};

export const fetchStocksData = async (stockSymbol) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getStocksData(stockSymbol));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};

export const fetchStocksNews = async (stockSymbol) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getStocksNews(stockSymbol));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};

export const fetchNewsById = async (newsId) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getNewsById(newsId));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};

export const fetchHistoricalData = async (stockSymbol) => {
  try {
    const response = await AxiosHelper.getAsync(UrlHelper.getHistoricalDataByStock(stockSymbol));
    return response;
  } catch (error) {
    throw new Error(error?.message, error?.statusCode);
  }
};

export const updateCurrentPrice = async (stockSymbol, newPrice, dispatch) => {
  console.log('updateCurrentPrice WORKS!');
  dispatch(stockIsLoading(true));
  try {
    const action = { stockSymbol, newPrice }; // Correct the payload format
    dispatch(stockSetNewPrice(action));  // Dispatch with the correct payload format
    console.log(`stockSymbol:${stockSymbol}, newPrice:${newPrice}`);
  } catch (error) {
    dispatch(stockIsError({ isError: true, errorMessage: error?.message, statusCode: error?.statusCode }));
  }
};
