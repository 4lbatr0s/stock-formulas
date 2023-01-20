import { getStockInfo as _getStockInfo  } from "../helpers/scrapping_helper.js";
import BaseService from "./BaseService.js";

class ScrapingService extends BaseService{
    async getStockInfo(symbol){
        const result = await _getStockInfo(symbol);
        // const result  = await getStockInfoPuppeeteer(symbol);
        return result; 
    }
}


export default new ScrapingService();