import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler.js';

//INFO: Route usages.
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import scrapRouter from './routes/scraping.js';

//INFO: App creation.
const app = express();

//INFO: Middlewares.
app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

//INFO: Route usages.
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/scrapping', scrapRouter);

//INFO: Error handler middleware (last middleware to use)
app.use(ErrorHandler);

app.listen(5001, ()=>{
    console.log("connected")
});

export default app;