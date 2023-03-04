import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";
import Caching from "../../scripts/utils/constants/Caching.js";
import redisConfig from "../../config/caching/redisConfig.js";


async function cacheData(req,res,next){
    let results;
    try {
        const redisClient = await redisConfig();
        const cachedResults = await redisClient.get(Caching.SP_500)
        if(cachedResults){
            results = JSON.parse(cachedResults);
            return res.status(httpStatus.OK).send({
                fromCache:true,
                data:results
            })
        } else {
            return next();
        }
    } catch (error) {
        throw new ApiError(error?.message, error?.statusCode);
    }
}

export default cacheData;