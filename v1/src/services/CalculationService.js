import CalculationHelper from "../scripts/utils/helpers/CalculationHelper.js";

class CalculationService{
    constructor(){}

    getGrahamNumbers(stockJsonArray){
        const grahamNumbers={};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const grahamNumber = CalculationHelper.grahamNumber(element);
            const stockName=element?.symbol;
            grahamNumbers[stockName]=grahamNumber;
        }
        const sortedGrahamNumbers = Object.entries(grahamNumbers)
        .filter((value)=> value[1])//not null or '' or NaN
        .sort((a,b)=> a[1]-b[1]) //sort ascending.
        console.log(sortedGrahamNumbers);
        return sortedGrahamNumbers;
    }
}

export default new CalculationService();