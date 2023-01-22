import rateLimit from 'express-rate-limit';


export const multiThreadingConfiguration = {
    // Implement the rate limiter middleware for each worker process
    "limiter": rateLimit({
        max: 40, // limit each worker to 20 requests per windowMs
        message: 'Too many requests, please try again later',
    }),

};
