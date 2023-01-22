import apiHelper from './api_helper.js';
import { load } from 'cheerio';
import { scrappingKeysAndElements } from '../constants/scrappingConstants.js';
import cluster from 'cluster';
import { multiThreadingConfiguration } from '../config/multithreading.js';
import os from 'os';
import app from '../app.js';
import UrlProvider from './url_helper.js';
import { defaultRequest } from './axios_helper.js';
// Implement the rate limiter middleware for each worker process
const limiter = multiThreadingConfiguration.limiter;
const numCPUs = os.cpus().length;

class ScrappingHelper {
    constructor(){}
    getBatchStockAlphaVantage = async (symbols) => {
        try {
            const url = UrlProvider.alphaVantageBatchLink(symbols); 
            const result = await apiHelper.getStockInfoAlphaAsync(url);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    // getMultipleStockInfoAsync = async (symbols) => {
    //     try {
    //         // Use map to create an array of promises for each symbol
    //         const promises = symbols.map((symbol) =>
    //         apiHelper.getStockInfoAsync(UrlProvider.getScrappingURL(symbol)));
    //         // Wait for all promises to resolve using Promise.all
    //         const axiosResponses = await Promise.all(promises);

    //         // Use map to extract the stock information from each response
    //         const stocks = axiosResponses.map((response) => {
    //             const returnObject = {};
    //             const $ = load(response);
    //             const stockInfos = this.createStockInfos($);
    //             returnObject[stockInfos.Name] = stockInfos;
    //             return returnObject;
    //         });

    //         // Return the final result as an array of objects
    //         return stocks;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

     getMultipleStockInfoAsync = async (symbols) => {
        try {
            if (cluster.isPrimary) {
                const numWorkers = os.cpus().length;
                console.log(`Master cluster setting up ${numWorkers} workers...`);
    
                for (let i = 0; i < numWorkers; i++) {
                    cluster.fork();
                }
    
                cluster.on('message', (worker, message) => {
                    console.log(`Received message from worker ${worker.id}: ${message}`);
                });
            } else {
                await limiter.schedule(() => {
                    const promises = symbols.map((symbol) => {
                        return new Promise((resolve, reject) => {
                            const worker = new Worker('./worker.js', {
                                workerData: { symbol, url: UrlProvider.getScrappingURL(symbol) }
                            });
                            worker.on('message', resolve);
                            worker.on('error', reject);
                            worker.on('exit', (code) => {
                                if (code !== 0) {
                                    reject(new Error(`Worker stopped with exit code ${code}`));
                                }
                            });
                        });
                    });
    
                    return Promise.all(promises).then((axiosResponses) => {
                        const stocks = axiosResponses.map((response) => {
                            const returnObject = {};
                            const $ = load(response);
                            const stockInfos = this.createStockInfos($);
                            returnObject[stockInfos.Name] = stockInfos;
                            return returnObject;
                        });
    
                        process.send(stocks);
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    //INFO: This will be used to get SP500 stock infos
    getMultipleStockInfoRateLimitedAsync = async (symbols) => {
        if (cluster.isMaster) {
            // Fork workers
            for (let i = 0; i < Math.min(numCPUs, 8); i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        } else {
            //implement the rate limiter middleware
            app.use(limiter);
            await getMultipleStockInfoAsync(symbols);
        }
    };

    createStockInfos = (rawScrappingData) => {
        const stockInfos = {};
        Object.keys(scrappingKeysAndElements).forEach(function (key) {
            stockInfos[key] = rawScrappingData(
                scrappingKeysAndElements[key]
            ).text();
        });
        stockInfos['Name'] = rawScrappingData(
            '[class="D(ib) Fz(18px)"]'
        ).text();
        return stockInfos;
    };

    getStockInfo = async (symbol) => {
        console.log(symbol);
        try {
            const axiosResponse = await apiHelper.getStockInfoAsync(symbol);
            const $ = load(axiosResponse);
            const stockInfos = this.createStockInfos($);
            console.log(stockInfos);
            return stockInfos;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new ScrappingHelper();
