import dotenv from "dotenv";
import redis from "redis";

//INFO: In this module, we'll have configurations for the server.

export default () => {
    dotenv.config({path:'v1/src/.env'});
}