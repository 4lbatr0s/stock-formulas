import NewsModel from "../models/News.js";
import BaseService from "../services/BaseService.js";

class NewsService extends BaseService{
    model = NewsModel;

    async insetManyNews(news){
        return await this.model.insertMany(news);
    }

    async saveItem(item){
        return await item.save();
    }
}

export default new NewsService(); //INFO: we can use the "this" keywod in the BaseService, because we create object instance here.