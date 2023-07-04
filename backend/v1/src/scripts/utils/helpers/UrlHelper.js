import URL from '../constants/URL.js';

class UrlHelper {
    constructor() {}

    getScrappingURL = (address, symbol) => {
        let url = '';
        switch (address) {
            case 'GOOGLE':
                break;
            default:
                url = `${URL.YAHOO}${symbol}`;
                break;
        }
        return url;
    };

    getBaseURL(address) {
        let url = '';
        switch (address) {
            case 'GOOGLE':
                break;
            default:
                url = 'https://finance.yahoo.com/quote/';
                break;
        }
        return url;
    }

    getYahooBatchUrl(symbol='') {
        // return `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
        return `http://192.168.1.46:5000/sp500-stocks`;
    }

    getYFinanceSingleStock(symbol){
        return `http://192.168.1.46:5000/sp500/${symbol}`;
    }

    getYFinanceBist100Url(symbols){
        return `http://192.168.1.46:5000/bist100-stocks/${symbols}`;
    }

    getYahooFinancialDataUrl(symbols) {
        return `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbols}?modules=financialData`;
    }

    getFinancialDataFromFinnhubUrl(symbol) {
        // return `${URL.FINNHUB_MAIN}/stock/metric?${symbol}=AAPL&metric=all&token=${process.env.FINNHUB_API_KEY}`;
        return `${URL.FINNHUB_MAIN}/stock/metric?symbol=${symbol}&metric=all`;
    }
    getFinnHubEbitda(symbol) {
        return `${URL.FINNHUB_MAIN}/stock/ebitda-estimate?symbol=${symbol}`;
    }
    scrapSP500SymbolsURL(){
        return `https://www.slickcharts.com/sp500`;
    }
    scrapBist100SymbolsURL(){
        return `https://uzmanpara.milliyet.com.tr/canli-borsa/bist-100-hisseleri/`;
    }

    getNewsForStockURL(symbol){
        return `${URL.ALPACA_NEWS}/${symbol}`
    }
    getSentimentAnalysisForFinancialText(){
        return `${URL.SENTIMENT_ANALYSIS}`
    }
}

export default new UrlHelper();