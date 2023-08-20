class RequestParameters {
  #pageSize = 10;

  constructor() {
    this.maxPageSize = 50;
    this.PageNumber = 1;
  }

  get pageSize() {
    return this.#pageSize;
  }

  set pageSize(size) {
    this.#pageSize = size > this.maxPageSize ? this.maxPageSize : size;
  }
}

export default RequestParameters;
