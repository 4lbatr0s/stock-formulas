class RequestHelper {
  constructor() {}

  setOptions(req) {
    const options = {
      pageNumber: req?.query.pageNumber,
      pageSize: req?.query.pageSize,
      searchTerm: req?.query.searchTerm,
      sortBy: req?.query.sortBy,
      orderBy: req?.query.orderBy,
      dynamicSorting: req.query.dynamicSorting,
      minGrahamNumber: req?.query.minGrahamNumber,
      maxGrahamNumber: req?.query.maxGrahamNumber,
      minPriceToEarningRate: req?.query.minPriceToEarningRate,
      maxPriceToEarningRate: req?.query.maxPriceToEarningRate,
      minPriceToBookRate: req?.query.minPriceToBookRate,
      maxPriceToBookRate: req?.query.maxPriceToBookRate,
      minEbitda: req?.query.minEbitda,
      maxEbitda: req?.query.maxEbitda,
      minDebtToEquitiy: req?.query.minDebtToEquitiy,
      maxDebtToEquity: req?.query.maxDebtToEquity,
      minReturnOnEquity: req?.query.minReturnOnEquity,
      maxReturnOnEquity: req?.query.maxReturnOnEquity,
      country: req?.query.country,
      market: req?.query.market,
      industry: req?.query.industry,
    };
    return options;
  }
}

export default new RequestHelper();
