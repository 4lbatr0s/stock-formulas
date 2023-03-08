import CalculationHelper from '../scripts/utils/helpers/CalculationHelper.js';
import fs from 'fs';
import Caching from '../scripts/utils/constants/Caching.js';
class Calculations {
    constructor() {
    }

    getGrahamNumbers(stockJsonArray) {
        const grahamNumbers = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const grahamNumber = CalculationHelper.grahamNumber(element);
            const stockName = element?.symbol;
            grahamNumbers[stockName] = grahamNumber;
        }
        const sortedGrahamNumbers = Object.entries(grahamNumbers)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => a[1] - b[1]); //sort ascending.
        // fs.writeFile('grahamNumbers.json', JSON.stringify(sortedGrahamNumbers), (err)=> {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log('File written successfully');
        //     }
        // });
        return sortedGrahamNumbers;
    }

    getPriceToEarningRates(stockJsonArray) {
        const priceToEarningRates = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToEarningRate =
                CalculationHelper.priceToEarningRate(element);
            const stockName = element?.symbol;
            priceToEarningRates[stockName] = priceToEarningRate;
        }
        const sortedpriceToEarningRates = Object.entries(priceToEarningRates)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => a[1] - b[1]); //sort ascending.
        return sortedpriceToEarningRates;
    }

    getPriceToBookRates(stockJsonArray) {
        const priceToBookRates = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToBookRate = CalculationHelper.priceToBookRate(element);
            const stockName = element?.symbol;
            priceToBookRates[stockName] = priceToBookRate;
        }
        const sortedpriceToBookRates = Object.entries(priceToBookRates)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => a[1] - b[1]); //sort ascending.
        return sortedpriceToBookRates;
    }

    getReturnOnEquities(stockJsonArray) {
        const returnOnEquties = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const returnOnEquity = CalculationHelper.returnOnEquity(element);
            const stockName = element?.symbol;
            returnOnEquties[stockName] = returnOnEquity;
        }
        const sortedreturnOnEquties = Object.entries(returnOnEquties)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => b[1] - a[1]); //sort descending.
        return sortedreturnOnEquties;
    }

    getPriceToSales(stockJsonArray) {
        const priceToSales = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToSale = CalculationHelper.priceToSalesRate(element);
            const stockName = element?.symbol;
            priceToSales[stockName] = priceToSale;
        }
        const sortedpriceToSales = Object.entries(priceToSales)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => a[1] - b[1]); //sort ascending.
        return sortedpriceToSales;
    }

    getDebtToEquityRates(stockJsonArray) {
        const debtToEquities = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const debtToEquity = CalculationHelper.debtToEquity(element);
            const stockName = element?.symbol;
            debtToEquities[stockName] = debtToEquity;
        }
        const sortedDebtToEquities = Object.entries(debtToEquities)
            .filter((value) => value[1]) //not null or '' or NaN
            .sort((a, b) => a[1] - b[1]); //sort ascending.
        return sortedDebtToEquities;
    }

    /**
     *
     * @param {*} stockJsonArray an object array contains stock information we get from api.
     * @returns an object that contains sorted values as an array for each formula.
     */
    getCalculations(stockJsonArray) {
        const sortedpriceToEarningRates = this.getPriceToEarningRates(stockJsonArray);
        const sortedGrahamNumbers = this.getGrahamNumbers(stockJsonArray);
        const sortedPriceToBookRates = this.getPriceToBookRates(stockJsonArray);
        const sortedreturnOnEquties = this.getReturnOnEquities(stockJsonArray);
        const sortedPriceToSales = this.getPriceToSales(stockJsonArray);
        const sortedDebtToEquities = this.getDebtToEquityRates(stockJsonArray);
        const calculations = {
            priceToEarningRates: sortedpriceToEarningRates,
            grahamNumbers: sortedGrahamNumbers,
            priceToBookRates: sortedPriceToBookRates,
            returnOnEquityRates: sortedreturnOnEquties,
            priceToSales: sortedPriceToSales,
            debtToEquities: sortedDebtToEquities,
        };
        return calculations;
    }
}

export default new Calculations();
