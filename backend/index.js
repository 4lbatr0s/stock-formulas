'use strict';
const express =  require('express');
const app = express(); //INFO: how to create a web application.
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();//INFO:How to reach dotenv configuration


const stockRoute = require("./routes/stocks");


//app.use = Middlewares

app.use(cors());
app.use(express.json()); //INFO: how to helps api to understand JSON format.



app.use("/api/stocks", stockRoute);



app.listen(5000, ()=> {
    console.log("works");
})



