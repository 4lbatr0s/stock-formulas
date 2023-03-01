import { load } from "cheerio";
import scrappingKeysAndElements from "../constants/ScrappingConstants.js";
import ApiHelper from "./ApiHelper.js";
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
}


export default new ScrappingHelper();