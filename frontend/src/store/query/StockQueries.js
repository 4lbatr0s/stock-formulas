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
