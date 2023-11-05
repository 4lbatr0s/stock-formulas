import { fileURLToPath } from "url";
import path from "path";
import httpStatus from "http-status";
import UserService from "../services/Users.js";
import Helper from "../scripts/utils/helpers/CommonHelper.js";
import ApiError from "../errors/ApiError.js";
import ApiNotFoundError from "../errors/ApiNotFoundError.js";
import Messages from "../scripts/utils/constants/Messages.js";
import RefreshToken from "../models/RefreshToken.js";
import Role from "../models/Role.js";
import Users from "../models/Users.js";
import TokenService from "../services/TokenService.js";
import Token from "./Token.js";
import JWT from "jsonwebtoken";
import CommonHelper from "../scripts/utils/helpers/CommonHelper.js";

const __filename = fileURLToPath(import.meta.url); // get all name
const __dirname = path.dirname(__filename); // get dir name from it.

class AuthenticationController {
  async register(req, res, next) {
    const hashedPassword = Helper.passwordToHash(req.body.password);
    req.body.password = hashedPassword;
    let roleNames = req.body.roles;
    try {
      const roles = await Role.find({ name: { $in: roleNames } });
      const roleIds = roles.map((role) => role._id);
      const result = await UserService.add({
        full_name: req.body.full_name,
        password: hashedPassword,
        email: req.body.email,
        profile_image: req.body.profile_image,
        roles: roleIds,
      });
      // TODO: do not return password.
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async login(req, res, next) {
    try {
      let user = await Users.findOne({ email: req.body.email })
        .populate("roles", "-__v")
        .exec();
      if (!user) {
        return next(new ApiNotFoundError());
      }
      const hashedPassword = Helper.passwordToHash(req.body.password);
      if (hashedPassword.toString() !== user.password) {
        return next(
          new ApiError(Messages.ERROR.WRONG_CREDENTIAL, httpStatus.UNAUTHORIZED)
        );
      }
      // TIP: How to use refresh an access token when login.
      const accessToken = Helper.createAccessToken(user);
      let refreshToken = await RefreshToken.findOne({ user: user });
      if (refreshToken) {
        refreshToken.token = await CommonHelper.createRefreshToken(user);
        await refreshToken.save();
      } else {
        refreshToken = await RefreshToken.createToken(user);
      }
      const { full_name: fullName, _id: id, email, roles } = user;
      const roleNames = roles.map((role) => role.name);
      user = {
        fullName,
        id,
        email,
        roles: roleNames,
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
      delete user.password; // TIP: do not return password.
      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async logout(req, res, next) {
    try {
      const decoded = JWT.decode(req.headers.authorization.split(" ")[1]);
      const user = await UserService.findOne({ email: decoded.email });
      if (!user) {
        res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: Messages.ERROR.USER_NOT_FOUND });
      }
      const refreshToken = await RefreshToken.findOne({ email: decoded.email });
      if (!refreshToken) {
        res
          .status(httpStatus.NOT_FOUND)
          .send({ message: Messages.ERROR.TOKEN_INVALID });
      } else {
        if (RefreshToken.verifyExpiration(refreshToken)) {
          res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: Messages.ERROR.NOT_LOGGED_IN });
        }
      }
      let newExpiryDate = refreshToken.expiryDate.setHours(
        refreshToken.expiryDate.getHours() - 1000
      );
      decoded.exp = decoded.exp - 1000 * 60 * 60;
      const newToken = JWT.sign(decoded, process.env.REFRESH_TOKEN_SECRET_KEY);
      refreshToken.token = newToken;
      await RefreshToken.updateOne(
        { _id: refreshToken._id },
        { token: newToken, expiryDate: newExpiryDate }
      );
      return res.send(httpStatus.OK);
    } catch {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }

  async verify(req, res) {
    try {
      const result = await TokenService.verify(
        req.body.requestToken,
        req.body.secretKey
      );
      if (!result) {
        res
          .status(httpStatus.UNAUTHORIZED)
          .send({ message: Messages.ERROR.TOKEN_EXPIRED });
      } else {
        res
          .status(httpStatus.OK)
          .send({ message: Messages.SUCCESS.TOKEN_VALID });
      }
    } catch (error) {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: Messages.ERROR.TOKEN_EXPIRED });
    }
  }
}

export default new AuthenticationController();
