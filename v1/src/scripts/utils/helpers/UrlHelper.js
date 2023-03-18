import URL from "../constants/URL.js";

class UrlHelper{
    constructor(){}
    
    getScrappingURL = (address, symbol) => {
        let url='';
        switch (address) {
            case 'GOOGLE':
                break;
            default:
                url = `${URL.YAHOO}${symbol}`;   
                break;
        }
        return url;
    };

    getBaseURL(address){
        let url=''
        switch (address) {
            case 'GOOGLE':
                break;
            default:
                url="https://finance.yahoo.com/quote/";
                break;
        }
        return url;
    };
    
    getYahooBatchUrl(symbols){
        return `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
    }
    getYahooFinancialDataUrl(symbols) {
        return `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbols}?modules=financialData`
      }
      
    getFinnHubMultipleStocksUrl(symbols){
        return `https://finnhub.io/api/v1/quote?symbol=${symbols}&token=${process.env.FINNHUB_API_KEY}`;
    }
}

export default new UrlHelper();