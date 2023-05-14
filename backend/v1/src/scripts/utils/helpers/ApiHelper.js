import ApiError from "../../../errors/ApiError.js";
import { publicRequest } from "./AxiosHelper.js";
import logger from "../../logger/Stocks.js";
import destinations from "../constants/Destinations.js";

class ApiHelper {
    constructor() {}


    getStockInfoAsync = async (pathname) => {
        try {
            const response = await publicRequest.get(pathname);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                logger.log({
                    level: 'info',
                    message: error?.message
                });
                return null;
            } else {
                logger.log({
                    level: 'error',
                    message: error?.message
                }); 
                throw new ApiError(error?.message, error?.statusCode);
            }
        }
    };

    getStockInfoAsyncFinnhub = async (pathname, finnhubToken) => {
        try {
            publicRequest.defaults.headers.common['X-Finnhub-Token'] = finnhubToken;
            const response = await publicRequest.get(pathname);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                logger.log({
                    level: 'info',
                    message: error?.message
                });
                return null;
            } else {
                logger.log({
                    level: 'error',
                    message: error?.message
                }); 
                throw new ApiError(error?.message, error?.statusCode);
            }
        }
    };
    
}

export default new ApiHelper();
