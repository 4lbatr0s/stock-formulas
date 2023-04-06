import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import CachingHelper from "../../scripts/utils/helpers/CachingHelper.js";
import PagedList from "../../models/shared/RequestFeatures/PagedList.js";
import StockExtensions from "../../services/extensions/StockExtensions.js";
import RequestHelper from "../../scripts/utils/helpers/RequestHelper.js";

async function cacheData(req,res,next){
    let rateType = req.params?.rateType || Caching.UNSORTED_STOCKS;
     try {
        const options = RequestHelper.setManipulationOptions(req);
        const cachedResults = await CachingHelper.getStockSortings(rateType);
        if(cachedResults && cachedResults !==''){
            const responseManipulation = StockExtensions.manipulationChaining(cachedResults, options);
            const paginatedResult = PagedList.ToPagedList(responseManipulation, req?.query.pageNumber, req?.query.pageSize)
            return res.status(httpStatus.OK).send({
                fromCache:true,
                data:paginatedResult
            })
        } else {
            return next();
        }
    } catch (error) {
        throw new ApiError(error?.message, error?.statusCode);
    }
}

export default cacheData;