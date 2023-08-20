import bringWeights, { weightPreferences } from '../constants/OverallScoreWeights.js';
import { commonRatiosToInclude, theBiggerTheBetter, theSmallerTheBetter } from "../constants/Calculations.js";

class CalculationHelper {
  /**
   * @param {Object} stock
   * @param {Object} propertyMinMax - Object containing the min and max values for each property
   * @returns {number} - Calculated overall value for a stock object
   */
  calculateOverallScorePerStock(stock, propertyMinMax) {
    const overallScoreWeights = bringWeights(weightPreferences.COMMON_WEIGHTS);
    try {
      const factors = [];
      const weights = [];

      for (const [property, value] of Object.entries(stock)) {
        if (value !== null && overallScoreWeights.hasOwnProperty(property)) {
          factors.push({
            name: property,
            value: this.normalizeValue(value, property, propertyMinMax),
          });
          weights.push(overallScoreWeights[property]);
        }
      }
      

      // Calculate the sum of weights of available ratios
      const sumOfWeights = weights.reduce((acc, val) => acc + val, 0);

      // Adjust the weights based on the available ratios
      const adjustedWeights = weights.map((weight) => weight / sumOfWeights);

      // Calculate the weighted sum
      const weightedSum = factors
        .map(
          (factor, i) => factor.value * adjustedWeights[i],
        )
        .reduce((acc, val) => acc + val, 0);

      // Calculate the overall score
      return weightedSum;
    } catch (error) {
      console.log(error);
    }
  }

  calculatePropertyMinMax(stockArray) {
    try {
      const properties = commonRatiosToInclude;
      const propertyMinMax = {};

      for (const property of properties) {
        let min = Infinity;
        let max = -Infinity;

        for (const json of stockArray) {
          const value = json[property];
          if (typeof value === 'number' && isFinite(value)) {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        }

        propertyMinMax[property] = {
          min,
          max,
        };
      }

      console.log('propertyMinMax:', propertyMinMax);
      return propertyMinMax;
    } catch (error) {
      console.log(error);
    }
  }

  normalizeValue(value, property, maxMinProperties) {
    try {
      const minValue = maxMinProperties[property].min;
      const maxValue = maxMinProperties[property].max;
      let normalizedValue;
      if (value < 0) {
        // Rule 1: For negative values, the smaller the value, the closer to -1
        normalizedValue = -1 + (value - minValue) / (maxValue - minValue);
      } else if (
         theSmallerTheBetter.includes(property)
      ) {
        // Rule 2: For specific properties with values >= 0, closer to 0 means closer to 1
        normalizedValue = 1 - (value - minValue) / (maxValue - minValue);
      } else if (
        theBiggerTheBetter.includes(property)
      ) {
        // Rule 3: For specific properties with values > 0 or equal to 0, closer to 1 means a higher value
        normalizedValue = value / maxValue;
      } else {
        // For any other properties, return the original value
        return value;
      }
      return normalizedValue;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param {Object} stockJson
   * @returns overall value of the stocks in the stockJson array.
   */
  allOverallValues(stockArray) {
    const calculatedValues = [];
    try {
      const propertyMinMax = this.calculatePropertyMinMax(stockArray);
      for (let i = 0; i < stockArray.length; i++) {
        const stock = stockArray[i];
        const overallScore = this.calculateOverallScorePerStock(
          stock,
          propertyMinMax,
        );
        stock.overallScore = overallScore;
        calculatedValues.push(stock);
      }
      return calculatedValues;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CalculationHelper();
