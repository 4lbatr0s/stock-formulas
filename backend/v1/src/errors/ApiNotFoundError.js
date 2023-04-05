import httpStatus from "http-status";
import ApiError from "./ApiError.js";
import Messages from "../scripts/utils/constants/Messages.js";

class ApiNotFoundError extends ApiError {
    constructor(){
        super(Messages.ERROR.RECORD_NOT_FOUND, httpStatus.NOT_FOUND);
    }
}

export default ApiNotFoundError;