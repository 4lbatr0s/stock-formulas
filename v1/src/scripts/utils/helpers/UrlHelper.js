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
}

export default new UrlHelper();