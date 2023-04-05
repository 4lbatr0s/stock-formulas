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

    getYahooBatchUrl(symbols) {
        return `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
    }
    getYahooFinancialDataUrl(symbols) {
        return `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbols}?modules=financialData`
        // return `https://finance.yahoo.com/quote/${symbols}/financials`;
    }

    getFinnHubMultipleStocksUrl(symbols) {
        return `${URL.FINNHUB_MAIN}/quote?symbol=${symbols}&token=${process.env.FINNHUB_API_KEY}`;
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
}

export default new UrlHelper();
