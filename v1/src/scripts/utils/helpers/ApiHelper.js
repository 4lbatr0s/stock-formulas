import { publicRequest } from "./AxiosHelper.js";

class ApiHelper {
    constructor() {}
    getStockInfoAsync = async (pathname) => {
        try {
            const response = await publicRequest.get(pathname);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new ApiHelper();
