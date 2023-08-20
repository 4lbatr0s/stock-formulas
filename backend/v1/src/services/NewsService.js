import NewsModel from '../models/News.js';
import BaseService from './BaseService.js';

class NewsService extends BaseService {
  model = NewsModel;

  async insetManyNews(news) {
    return await this.model.insertMany(news);
  }

  async saveItem(item) {
    return await item.save();
  }

  async softDelete(itemId) {
    return await this.update({ _id: itemId }, { isDeleted: true });
  }
}

export default new NewsService(); // INFO: we can use the "this" keywod in the BaseService, because we create object instance here.
