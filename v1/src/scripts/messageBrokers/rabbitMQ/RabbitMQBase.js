import amqp from 'amqplib';
import MessageBrokers from '../../utils/constants/MessageBrokers.js';
import { stockSymbols } from '../../../loaders/stockSymbols.js';
import StockService from '../../../services/Stocks.js';
import ApiError from '../../../errors/ApiError.js';

class RabbitMQBase {
    //   async sendBatch(channel) {

    //     stockSymbols.forEach(async (stock)=> {
    //       try {
    //         const response = await StockService.getFinancialDataForStock(stock);
    //         response.stockSymbol = stock;
    //         channel.sendToQueue(
    //             MessageBrokers.RABBIT_MQ.FINNHUB,
    //             Buffer.from(JSON.stringify(response))
    //         );
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     });
    // }

    async sendBatch(channel) {
        console.log("sendBa")
        for (const stock of stockSymbols) {
            try {
                const response = await StockService.getFinancialDataForStock(
                    stock
                );
                let financialData;
                if(response){
                    financialData = response?.quoteSummary.result['0'].financialData
                } else {
                    financialData = {}
                }
                financialData.stockSymbol = stock;
                await channel.sendToQueue(
                    MessageBrokers.RABBIT_MQ.FINNHUB,
                    Buffer.from(JSON.stringify(financialData))
                );
            } catch (error) {
                console.log(error);
            }
        }
    }
    async CallThirtyStockPerSeconds() {
        try {
            const connection = await amqp.connect('amqp://localhost:5672');
            const channel = await connection.createChannel();
            const assertion = await channel.assertQueue(
                MessageBrokers.RABBIT_MQ.FINNHUB
            );
            await this.sendBatch(channel);
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }

    async consumeFinnhubMessages() {
        try {
            console.log('Consuming');
            const connection = await amqp.connect('amqp://localhost:5672');
            const channel = await connection.createChannel();
            const assertion = await channel.assertQueue(
                MessageBrokers.RABBIT_MQ.FINNHUB
            );
            const result = [];

            let numMessagesReceived = 0;
            const numExpectedMessages = stockSymbols.length;

            return new Promise((resolve, reject) => {
                channel.consume(MessageBrokers.RABBIT_MQ.FINNHUB, (message) => {
                    const content = message.content.toString();
                    result.push(JSON.parse(content));
                    numMessagesReceived++;

                    if (numMessagesReceived === numExpectedMessages) {
                        channel.close();
                        connection.close();
                        resolve(result);
                    } else {
                        channel.ack(message);
                    }
                });
            });
        } catch (error) {
            throw new ApiError(error?.message, error?.statusCode);
        }
    }
}

export default new RabbitMQBase();
