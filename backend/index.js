'use strict';
const express =  require('express');
const app = express(); //INFO: how to create a web application.
const dotenv = require('dotenv');
const cors = require("cors");
const dfd = require("danfojs-node")

dotenv.config();//INFO:How to reach dotenv configuration

const dataManipulators = require("./utils/dataManipulators");



const stockRoute = require("./routes/stocks");
const { readCSV } = require('./utils/dataManipulators');


//app.use = Middlewares

app.use(cors());
app.use(express.json()); //INFO: how to helps api to understand JSON format.
app.use(express.static("public"))


app.use("/api/stocks", stockRoute);



const result = readCSV('/home/serhatoner/Coding/stock-formulas/backend/public/constituents.csv');
app.listen(5000, ()=> {
    console.log("works");
    console.log(result);
})



