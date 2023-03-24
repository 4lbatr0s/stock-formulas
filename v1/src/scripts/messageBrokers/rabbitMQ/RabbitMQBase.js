import amqp from 'amqplib';
import MessageBrokers from '../../utils/constants/MessageBrokers.js';
import { stockSymbols } from '../../../loaders/stockSymbols.js';
import StockService from '../../../services/Stocks.js';
import ApiError from '../../../errors/ApiError.js';

class RabbitMQBase{
    async CallThirtyStockPerSeconds(next) {
        try {
          const connection = await amqp.connect('amqp://localhost:5672');
          const channel = await connection.createChannel();
          const assertion = await channel.assertQueue(MessageBrokers.RABBIT_MQ.FINNHUB);
          let count = 0;
          
          async function sendBatch() {
            const promises = [];
            for (let i = count; i < count + 30 && i < stockSymbols.length; i++) {
              promises.push(new Promise((resolve,reject)=> {
              (async function(){
                  try {
                    const result = await StockService.getSingleStockInfoFromFinnhub(stockSymbols[i]);
                    resolve(result);                      
                  } catch (error) {
                    reject(error);                    
                  }
                })();
              }));
            }
            const results = await Promise.all(promises);
            for (const result of results) {
              channel.sendToQueue(MessageBrokers.RABBIT_MQ.FINNHUB, Buffer.from(JSON.stringify(result)));
              console.log("Message sent:", result);
            }
            count += 30;
          }          
          
          async function sendBatches() {
            while (count < stockSymbols.length) {
              await sendBatch();
              await new Promise(resolve => setTimeout(resolve, 3000));
            }
          }
          
          // Call sendBatches to start sending messages
          sendBatches();
          
          // async function sendBatch() {
          //   for (let i = count; i < count + 30 && i < stockSymbols.length; i++) {
          //     const result = await new Promise((resolve, reject) => {
          //       setTimeout(async () => {
          //         try {
          //           const result = await StockService.getSingleStockInfoFromFinnhub(stockSymbols[i]);
          //           resolve(result);
          //         } catch (error) {
          //           reject(error);
          //         }
          //       }, 1000 * i);
          //     });
          
          //     channel.sendToQueue(MessageBrokers.RABBIT_MQ.FINNHUB, Buffer.from(JSON.stringify(result)));
          //     console.log("Message sent:", result);
          //   }
          //   count += 30;
          // }
          
    
          // setTimeout(() => {
          //   sendBatch();
          //   setInterval(sendBatch, 1500);
          // }, 0);
          // setInterval(sendBatch, 1500);
        } catch (error) {
          return next(new ApiError(error?.message, error?.statusCode));
        }
    }

    async consumeFinnhubMessages(next) {
      try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(MessageBrokers.RABBIT_MQ.FINNHUB);
        const result = [];
    
        let numMessagesReceived = 0;
        const numExpectedMessages = stockSymbols.length;
    
        return new Promise((resolve, reject) => {
          channel.consume(MessageBrokers.RABBIT_MQ.FINNHUB, (message) => {
            const content = message.content.toString();
            console.log('Received message:', content);
            result.push(content);
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
        return next(new ApiError(error?.message, error?.statusCode));
      }
    }
    
}




export default new RabbitMQBase();
  