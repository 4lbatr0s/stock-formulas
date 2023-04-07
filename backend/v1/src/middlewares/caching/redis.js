import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import CachingHelper from "../../scripts/utils/helpers/CachingHelper.js";
import PagedList from "../../models/shared/RequestFeatures/PagedList.js";
import StockExtensions from "../../services/extensions/StockExtensions.js";
import RequestHelper from "../../scripts/utils/helpers/RequestHelper.js";

async function cacheData(req,res,next){
     try {
        const options = RequestHelper.setOptions(req);
        const sortedStocks = await CachingHelper.getStockSortings(options);
        if(sortedStocks && sortedStocks !==''){
            res.set('X-Pagination', JSON.stringify(sortedStocks.MetaData));
            return res.status(httpStatus.OK).send({
                fromCache:true,
                data:sortedStocks
            })
        } else {
            return next();
        }
    } catch (error) {
        throw new ApiError(error?.message, error?.statusCode);
    }
}

export default cacheData;