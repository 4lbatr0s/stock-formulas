import amqp from 'amqplib';
import MessageBrokers from '../../utils/constants/MessageBrokers';
import { stockSymbols } from '../../../loaders/stockSymbols';
import StockService from '../../../services/Stocks';
async function CallThirtyStockPerSeconds(){
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(MessageBrokers.RABBIT_MQ.FINNHUB);
        let count = 0;
        setInterval(()=> {
            stockSymbols.forEach(stock => {
                
            });
        },1500)
    } catch (error) {
        
    }
}