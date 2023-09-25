import redis from "redis";

const redisClient = redis.createClient({
  // host: '172.29.181.133', // replace with your WSL2 IP address
  host: "172.17.0.2", //docker container.
  port: 6379,
});
redisClient.on("error", (err) => console.log("Error:", err));
await redisClient.connect();

export default redisClient;
