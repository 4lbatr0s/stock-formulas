import axios from 'axios';
import { defaultRequest, publicRequest } from './axios_helper.js';

class ApiHelper {
    constructor() {}

    getStockInfoAsync = async (pathname) => {
        try {
            console.log(pathname);
            const response = await publicRequest.get(pathname);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    getStockInfoAlphaAsync = async (url) => {
      try {
          console.log("URL:",url);
          const response = await axios.get(url);
          return response.data;
      } catch (error) {
          console.log(error);
      }
  };

}

export default new ApiHelper();
