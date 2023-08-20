import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import CachingHelper from '../../scripts/utils/helpers/CachingHelper.js';
import RequestHelper from '../../scripts/utils/helpers/RequestHelper.js';

async function cacheData(req, res, next) {
  try {
    const stockExchange = req.url.split('/');
    const stockExchangeType = stockExchange[stockExchange.length - 1];
    const options = RequestHelper.setOptions(req);
    const sortedStocks = await CachingHelper.getStockSortings(options, stockExchangeType);
    if (sortedStocks && sortedStocks !== '') {
      res.set('X-Pagination', JSON.stringify(sortedStocks.MetaData));
      return res.status(httpStatus.OK).send({
        fromCache: true,
        data: sortedStocks,
      });
    }
    return next();
  } catch (error) {
    throw new ApiError(error?.message, error?.statusCode);
  }
}

export default cacheData;
