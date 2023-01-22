import dotenv from "dotenv";


dotenv.config();
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
class UrlProvider{
    constructor(){}
    getScrappingURL = (symbol) => {
        console.log("SymbolScrapping:",symbol)
        const url = `https://finance.yahoo.com/quote/${symbol}`; 
        return url;
    };
    getSP500Symbols = ()=>{
        const url = "https://www.slickcharts.com/sp500";
        return url;
    }

    alphaVantageBatchLink(symbols){
        // const stocks = symbols.join(",");
        const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_PRICES&symbols=${symbols}&apikey=${apiKey}`;
        return url;
    }
    getBaseURL(){
        const url = "https://finance.yahoo.com/quote";
        return url;
    };
}

export default new UrlProvider();
//new urls goes here..