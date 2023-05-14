import CalculationHelper from '../scripts/utils/helpers/CalculationHelper.js';
import fs from 'fs';
import Caching from '../scripts/utils/constants/Caching.js';

/**
 * INFO: When the getSP500Concurrent() method of StockService is called,
 * we calculate, Graham Numbers, Price to Earning Rates and Price to Book Rates.
 * As you can see, we put graham number or other values to the stock json objects.
 * Then in StockHelper.js file, we sort the stocks based on these JSON object properties.
 * Returning values in this module does not mean anything.
 */


class Calculations {
    constructor() {}

    //TODO: We don't need the sortings here anymore, we just need the values.
    getGrahamNumbers(stockJsonArray) {
        const grahamNumbers = {};
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const grahamNumber = CalculationHelper.grahamNumber(element);
            const stockName = element?.symbol;
            grahamNumbers[stockName] = grahamNumber;
        }
        const sortedGrahamNumbers = Object.entries(grahamNumbers).sort((a, b) => a[1] - b[1]); 
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
        const sortedpriceToEarningRates = Object.entries(priceToEarningRates).sort((a, b) =>  b[1] - a[1]); //sort ascending.
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
            .filter((value) => value[1]).sort((a, b) =>  b[1] - a[1]); //sort descending.
        return sortedpriceToBookRates;
    }

    getCalculatedValuesPerEveryStock(stockJsonArray){
        const calculatedStocks = [];
        for (let i = 0; i < stockJsonArray.length; i++) {
            const element = stockJsonArray[i];
            const priceToBookRate = Number(CalculationHelper.priceToBookRate(element).toFixed(3));
            const priceToEarningRate = Number(CalculationHelper.priceToEarningRate(element).toFixed(3));
            const grahamNumber = Number(CalculationHelper.grahamNumber(element).toFixed(3));
            const stockName = element?.underlyingSymbol;
            calculatedStocks.push({
                stockName:stockName,
                priceToBookRate:priceToBookRate,
                priceToEarningRate:priceToEarningRate,
                grahamNumber:grahamNumber
            })
        }

        return calculatedStocks;
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
        const calculations = {
            priceToEarningRates: sortedpriceToEarningRates,
            grahamNumbers: sortedGrahamNumbers,
            priceToBookRates: sortedPriceToBookRates,
        };
        return calculations;
    }
}

export default new Calculations();
