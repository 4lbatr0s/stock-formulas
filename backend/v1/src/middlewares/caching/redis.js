import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import redisClient from "../../config/caching/redisConfig.js";
import CachingHelper from "../../scripts/utils/helpers/CachingHelper.js";
import PagedList from "../../models/shared/RequestFeatures/PagedList.js";
async function cacheData(req,res,next){
    let rateType = req.params?.rateType || Caching.SP_500;
     try {
        const cachedResults = await CachingHelper.getStockSortings(rateType);
        if(cachedResults && cachedResults !==''){
            const paginatedResult = PagedList.ToPagedList(cachedResults, req?.query.pageNumber, req?.query.pageSize)
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