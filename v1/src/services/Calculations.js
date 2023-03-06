import CalculationHelper from "../scripts/utils/helpers/CalculationHelper.js";
import fs from 'fs';
class Calculations{
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
        // fs.writeFile('grahamNumbers.json', JSON.stringify(sortedGrahamNumbers), (err)=> {
        //     if(err){
        //         console.log(err);
        //     } else { 
        //         console.log('File written successfully');
        //     }
        // });
        return sortedGrahamNumbers;
    }

    getPriceToEarningRates(stockJsonArray){
        const priceToEarningRates={};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToEarningRate = CalculationHelper.priceToEarningRate(element);
            const stockName=element?.symbol;
            priceToEarningRates[stockName]=priceToEarningRate;
        }
        const sortedpriceToEarningRates = Object.entries(priceToEarningRates)
        .filter((value)=> value[1])//not null or '' or NaN
        .sort((a,b)=> a[1]-b[1]) //sort ascending.
        // fs.writeFile('priceToEarningRate.json', JSON.stringify(sortedpriceToEarningRates), (err)=> {
        //     if(err){
        //         console.log(err);
        //     } else { 
        //         console.log('File written successfully');
        //     }
        // });
        return sortedpriceToEarningRates;        
    }

    getPriceToBookRates(stockJsonArray){
        const priceToBookRates={};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToBookRate = CalculationHelper.priceToBookRate(element);
            const stockName=element?.symbol;
            priceToBookRates[stockName]=priceToBookRate;
        }
        const sortedpriceToBookRates = Object.entries(priceToBookRates)
        .filter((value)=> value[1])//not null or '' or NaN
        .sort((a,b)=> a[1]-b[1]) //sort ascending.
        // fs.writeFile('priceToBookRate.json', JSON.stringify(sortedpriceToBookRates), (err)=> {
        //     if(err){
        //         console.log(err);
        //     } else { 
        //         console.log('File written successfully');
        //     }
        // });
        return sortedpriceToBookRates;        
    }


    /**
     * 
     * @param {*} stockJsonArray an object array contains stock information we get from api. 
     * @returns an object that contains sorted values as an array for each formula.
     */
    getCalculations(stockJsonArray){
        const sortedpriceToEarningRates = this.getPriceToEarningRates(stockJsonArray);
        const sortedGrahamNumbers = this.getGrahamNumbers(stockJsonArray);
        const sortedPriceToBookRates = this.getPriceToBookRates(stockJsonArray);
        const calculations={ 
            priceToEarningRates:sortedpriceToEarningRates,
            grahamNumbers:sortedGrahamNumbers,
            priceToBookRates:sortedPriceToBookRates
        }
        return calculations;
    }
}

export default new Calculations();