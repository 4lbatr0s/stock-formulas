import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import express from "express";
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'];

export default (app)=> {
    app.use(cors({
        allowedOrigins
    }));
    app.use(compression());
    app.use(express.json());//TIP: to use json files in the js.
    app.use(helmet());//TIP: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
    app.use(fileUpload()); //TIP:When you upload a file, the file will be accessible from req.files.
};