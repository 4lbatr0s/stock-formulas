export const BASE_URL = "https://finance.yahoo.com/quote/";

export const getScrappingURL = (symbol) => {
    console.log("SymbolScrapping:",symbol)
    return `https://finance.yahoo.com/quote/${symbol}`
}

//new urls goes here..