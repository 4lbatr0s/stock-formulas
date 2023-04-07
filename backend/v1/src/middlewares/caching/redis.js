import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import CachingHelper from "../../scripts/utils/helpers/CachingHelper.js";
import PagedList from "../../models/shared/RequestFeatures/PagedList.js";
import StockExtensions from "../../services/extensions/StockExtensions.js";
import RequestHelper from "../../scripts/utils/helpers/RequestHelper.js";

async function cacheData(req,res,next){
    let rateType = req.query?.rateType || Caching.PARAMETERS;
     try {
        const options = RequestHelper.setOptions(req);
        const sortedStocks = await CachingHelper.getStockSortings(rateType, options);
        if(sortedStocks && sortedStocks !==''){
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