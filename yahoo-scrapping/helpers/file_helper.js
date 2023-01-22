import csv from 'csv-parser';
import fs from "fs";

let stockSymbols = [];

fs.readFile('files/SP500Symbols.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const stockSymbols = data.split('\n');
    fs.writeFile("constants/scrappingConstants.js", `export const stockSymbols=${JSON.stringify(stockSymbols)}`, (err)=> {
        if (err) throw err;
        console.log("stocks are written");
    })
});
