import MetaData from "./MetaData.js";

class PagedList extends Array {
    constructor(items, count, pageNumber=1, pageSize=50) {
      super();
      this.MetaData = new MetaData(pageNumber, Math.ceil(count/pageSize), pageSize, count);
      // this.MetaData = {
      //   TotalCount: count,
      //   PageSize: pageSize,
      //   CurrentPage: pageNumber,
      //   TotalPages: Math.ceil(count / pageSize),
      // };
      this.push(...items);
    }
  
    static ToPagedList(source, pageNumber, pageSize) {
      const count = source.length;
      // const items = source.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      return new PagedList(source, count, pageNumber, pageSize);
    }
}

export default PagedList;