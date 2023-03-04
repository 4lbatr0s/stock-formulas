import BaseService from "./BaseService";

class CalculationService{
    constructor(){}
    
    /**
     * @param {Object} stockJson JSON object of the stock we want make calculation from.
     * @returns Graham number of the stock
     */
    grahamNumber(stockJson){
        const epsTrailingExistsAndNumber = stockJson?.epsTrailingTwelveMonths && typeof stockJson.epsTrailingTwelveMonths === 'number';
        const bookValueExistAndNumber =  stockJson?.bookValue && typeof stockJson.bookValue === 'number';
        if(!epsTrailingExistsAndNumber || !bookValueExistAndNumber)
            return '';
        return Math.sqrt(stockJson.epsTrailingTwelveMonths * stockJson.bookValue);
    }
}

export default new CalculationService();