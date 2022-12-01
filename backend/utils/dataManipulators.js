import { readCSV as _readCSV } from "danfojs-node";

/**
 * 
 * @param {String} csvFilePath path of the csv file you want to read. 
 * @returns 
 */
const readCSV = (csvFilePath)=> {
    const result = _readCSV(csvFilePath)
    .then(df=> {
        df.head().print()
    }).catch(err=> {
        console.log(err);
    })    
    return result;
}
