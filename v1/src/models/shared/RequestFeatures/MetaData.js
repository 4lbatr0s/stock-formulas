class MetaData {
    constructor() {
      this.currentPage = 1;
      this.totalPages = 1;
      this.pageSize = 50;
      this.totalCount = 0;
    }
    get hasPrevious() {
      return this.currentPage > 1;
    }
    get hasNext() {
      return this.currentPage < this.totalPages;
    }
}



export default MetaData;
  