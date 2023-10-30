import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import Messages from "../scripts/utils/constants/Messages.js";
import UserService from "../services/Users.js";
import Role from "../models/Role.js";
import ApiError from "../errors/ApiError.js";
import { roleEnum } from "../scripts/utils/constants/Roles.js";
import { HttpStatusCode } from "axios";
import RefreshToken from "../models/RefreshToken.js";
import TokenController from "../controllers/Token.js";
import globalErrorHandler from "./error.js";
import TokenService from "../services/TokenService.js";

const { TokenExpiredError } = JWT;
const refreshToken = async (req, res) => {
  let refreshToken;

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.decode(token);
    refreshToken = await RefreshToken.findOne({ user: decoded._id });

    if (RefreshToken.verifyExpiration(refreshToken)) {
      throw new ApiError(Messages.ERROR.RESIGN, httpStatus.UNAUTHORIZED);
    }

    const { accessToken } = await TokenService.refresh(refreshToken?.token);
    return accessToken;
  } catch (error) {
    throw new ApiError(error?.message, error?.statusCode);
  }
};


const catchError = async (err, req, res) => {
  if (err instanceof TokenExpiredError) {
      const accessToken = await refreshToken(req, res);
      req.headers.authorization = `Bearer ${accessToken}`;
      return next(); // Continue to the next middleware or route with the new access token.
  } else {
    throw new ApiError(Messages.ERROR.TOKEN_EXPIRED, httpStatus.UNAUTHORIZED);
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.headers?.authorization?.split(" ")[1] || null;

  if (!token)
    return next(new ApiError("YOU ARE NOT LOGGED IN", httpStatus.UNAUTHORIZED));

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
    if (error) return catchError(error, req, res);

    req.user = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserService.find(req.user._id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ error: Messages.ERROR.USER_NOT_FOUND });
    }

    const roles = await Role.find({
      _id: { $in: user.roles },
    }).exec();

    for (let role of roles) {
      if (role.name === roleEnum.ADMIN) {
        next();
      } else {
        return res
          .status(HttpStatusCode.Forbidden)
          .send({ error: Messages.ERROR.FORBIDDEN });
      }
    }
  } catch (error) {
    throw new ApiError(error?.message, error?.statusCode);
  }
};

const authenticatationMiddleware = {
  verifyToken,
  isAdmin,
};

export default authenticatationMiddleware;
