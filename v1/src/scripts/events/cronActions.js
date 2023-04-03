import cron from 'node-cron';
import axios from 'axios';
import StockService from '../../services/Stocks.js';
import ApiError from '../../errors/ApiError.js';

const executeTheSP500 = async () => {
    try {
        console.log('executeTHE500');
        const response = await StockService.getSP500Concurrent();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const executeTheMessageBroker = async () => {
    try {
        console.log('executeTheMessageBroker');
        const response = await StockService.messageBroker();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

const executePromiseAll = async () =>{ 
    try {
        console.log('executeTheMessageBroker');
        const response = await StockService.getMultipleStockInformationWithPromiseAll();
        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

const initialJob = async () => {
    console.log('Sending request INITIAL...');
    try {
        await executeTheSP500();
        // await executeTheMessageBroker(); //TODO: SHOULD USE MESSAGE BROKER INSTEAD OF PROMISE ALL.
        await executePromiseAll();
    } catch (error) {
        console.error(error);
    }
};




const quoteDataJobEveryFifteenMinutes = cron.schedule('*/15 * * * *', () => {
    return StockService.getSP500Concurrent()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
});

const financialDataJobEverHour = cron.schedule('0 * * * *', () => {
    return StockService.messageBroker()
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
});

const jobStarter = async () => {
    // await initialJob();
    // quoteDataJobEveryFifteenMinutes.start();
    // financialDataJobEverHour.start();
};

export default jobStarter;
