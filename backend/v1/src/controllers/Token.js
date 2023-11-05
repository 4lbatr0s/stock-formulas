import { fileURLToPath } from "url";
import path from "path";
import httpStatus from "http-status";
import UserService from "../services/Users.js";
import Helper from "../scripts/utils/helpers/CommonHelper.js";
import ApiError from "../errors/ApiError.js";
import ApiNotFoundError from "../errors/ApiNotFoundError.js";
import Messages from "../scripts/utils/constants/Messages.js";
import RefreshToken from "../models/RefreshToken.js";
import TokenService from "../services/TokenService.js";

const __filename = fileURLToPath(import.meta.url); // get all name
const __dirname = path.dirname(__filename); // get dir name from it.

class TokenController {
  async refresh(req, res, next) {
    const { refreshToken: requestToken } = req.body;
    try {
      const result = await TokenService.refresh(requestToken);
      return res.status(httpStatus.CREATED).send(result);      
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
  async verify(req, res, next) {
    const { token: requestToken, key:secretKey } = req.body;
    try {
      const result = await TokenService.verify(requestToken, secretKey );
      return res.status(httpStatus.CREATED).send(result);      
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new TokenController();
