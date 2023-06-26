import Ticker from "../models/Tickers.js";
import BaseService from "../services/BaseService.js";

class TickerServicve extends BaseService{
    model = Ticker;
    async insertMany(items){
        return await this.model.insertMany(items)
    }

}

export default new TickerServicve(); //INFO: we can use the "this" keywod in the BaseService, because we create object instance here.