import dotenv from "dotenv";
dotenv.config();

const ErrorHandler = (err, req,res, next) => {
    console.log("Middleware error handling!");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json(
        {
            success:false,
            status:errStatus,
            message:errMsg,
            /*err.stack shows the exact file and line number the error occured */
            stack: process.env.NODE_ENV === "development" ? err.stack : {}
        }
    )
}

export default ErrorHandler;