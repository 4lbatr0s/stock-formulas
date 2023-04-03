import { load } from 'cheerio';
import scrappingKeysAndElements from '../constants/ScrappingConstants.js';
import ScriptHelper from '../helper.js';
import ApiHelper from './ApiHelper.js';
import UrlHelper from './UrlHelper.js';
import cheerio from 'cheerio';
import { publicRequest } from './AxiosHelper.js';
import redisClient from '../../../config/caching/redisConfig.js';
import Caching from '../constants/Caching.js';
class ScrappingHelper {
    constructor() {}
    createStockInfos = (rawScrappingData) => {
        const stockInfos = {};
        for (const [key, value] of Object.entries(scrappingKeysAndElements)) {
            stockInfos[key] = rawScrappingData(value).text();
        }
        // stockInfos['Name'] = rawScrappingData(
        //     '[class="D(ib) Fz(18px)"]'
        // ).text();
        return stockInfos;
    };

    getStockInfo = async (symbol) => {
        console.log(symbol);
        try {
            const axiosResponse = await ApiHelper.getStockInfoAsync(symbol);
            const $ = load(axiosResponse);
            const stockInfos = this.createStockInfos($);
            console.log(stockInfos);
            return stockInfos;
        } catch (error) {
            console.log(error);
        }
    };

    //INFO: when you use, {} in the map, you need to use return!
    getMultipleStockInfos = async (symbols) => {
        console.log(symbols);
        const symbolArray = ScriptHelper.clearStockSymbols(symbols);
        try {
            const stockInfos = await Promise.all(
                symbolArray.map(async (symbol) => {
                    const singularStockInfo = await this.getStockInfo(symbol);
                    return {
                        symbol: singularStockInfo,
                    };
                })
            );
            return stockInfos;
        } catch (error) {
            console.log(error);
        }
    };

    async scrapSP500Symbols() {
        try {
            const response = await publicRequest(
                UrlHelper.scrapSP500SymbolsURL()
            );
            const $ = cheerio.load(response.data);
            const table = $('table.table-hover.table-borderless.table-sm');
            const tbody = table.children('tbody');
            let symbols = [];
            tbody.find('tr').each((i, tr) => {
                const td3 = $(tr).children('td:nth-child(3)');
                const symbol = td3.text().trim();
                symbols.push(symbol);
            });
            symbols = symbols.slice(0, -4);
            await redisClient.set(
                Caching.SYMBOLS.SPFH,
                JSON.stringify(symbols)
            );
            return symbols;
        } catch (error) {
            console.log(error);
        }
    }

    async scrapBIST100Symbols() {
        try {
            const response = await publicRequest.get(
                UrlHelper.scrapBist100SymbolsURL()
            );
            const $ = cheerio.load(response.data);
            const stockSymbols = [];

            $('div.detL div.box.box10 table').each((index, element) => {
                const tbody = $(element).find('tbody');
                $(tbody)
                    .find('tr:nth-child(n+2) td.currency a b')
                    .each((i, e) => {
                        stockSymbols.push($(e).text());
                    });
            });
            await redisClient.set(
                Caching.SYMBOLS.BISTHUND,
                JSON.stringify(stockSymbols)
            );
            return stockSymbols;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ScrappingHelper();
