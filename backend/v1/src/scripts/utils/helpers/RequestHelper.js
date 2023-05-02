class RequestHelper{
    constructor(){}
    setOptions(req){
        const options = {
            pageNumber:req?.query.pageNumber, 
            pageSize:req?.query.pageSize,
            searchTerm:req?.query.searchTerm,
            orderByQueryString:req?.query.sortBy,
            dynamicSorting:req.query.dynamicSorting,
            minGrahamNumber: req?.query.minGrahamNumber,
            maxGrahamNumber:req?.query.maxGrahamNumber,
            minPriceToEarningRate: req?.query.minPriceToEarningRate,
            maxPriceToEarningRate:req?.query.maxPriceToEarningRate,
            minPriceToBookRate: req?.query.minPriceToBookRate,
            maxPriceToBookRate:req?.query.maxPriceToBookRate,
            minEbitda: req?.query.minEbitda,
            maxEbitda:req?.query.maxEbitda,
            minDebtToEquitiy: req?.query.minDebtToEquitiy,
            maxDebtToEquity:req?.query.maxDebtToEquity,
            minReturnOnEquity: req?.query.minReturnOnEquity,
            maxReturnOnEquity:req?.query.maxReturnOnEquity,
        }
        return options;   
    }
}

export default new RequestHelper();