import redis from "redis";

export default async ()=> {
    const redisClient = redis.createClient();
    redisClient.on('error', err=> console.log('Error:', err));
    await redisClient.connect();
    return redisClient;
}