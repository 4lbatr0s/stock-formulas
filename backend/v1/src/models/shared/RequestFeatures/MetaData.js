class MetaData {
    constructor(currentPage=1, totalPages=1, pageSize=50, totalCount=0) {
      this.currentPage = currentPage;
      this.totalPages = totalPages;
      this.pageSize = pageSize;
      this.totalCount = totalCount;
    }
    get hasPrevious() {
      return this.currentPage > 1;
    }
    get hasNext() {
      return this.currentPage < this.totalPages;
    }
}



export default MetaData;
  