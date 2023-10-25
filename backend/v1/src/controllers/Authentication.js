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

const __filename = fileURLToPath(import.meta.url); // get all name
const __dirname = path.dirname(__filename); // get dir name from it.

class AuthenticationController {
  async register(req, res, next) {
    req.body.password = Helper.passwordToHash(req.body.password);
    let roleNames = req.body.roles;
    try {
      const roles = await Role.find({ name: { $in: roleNames } });
      const roleIds = roles.map(role => role._id);
      const result = await UserService.add({
        full_name: req.body.full_name,
        password: req.body.password,
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
      let user = await Users.findOne({email:req.body.email})
        .populate("roles", "-__v")
        .exec();
      if (!user) {
        return next(new ApiNotFoundError());
      }
      const hashedPassword = Helper.passwordToHash(req.body.password);
      if (hashedPassword.toString() !== user.password) {
        return next(new ApiError(Messages.ERROR.WRONG_CREDENTIAL, httpStatus.UNAUTHORIZED));
      }
      // TIP: How to use refresh an access token when login.

      const accessToken = Helper.createAccessToken(user);
      const refreshToken = await RefreshToken.createToken(user);
      const {full_name:fullName, _id:id,email, roles } = user; 
      const roleNames = roles.map(role => role.name);
      user = {
        fullName,
        id,
        email,
        roles:roleNames,
        tokens: {
          accessToken:accessToken,
          refreshToken:refreshToken,
        },
      };
      delete user.password; // TIP: do not return password.
      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new AuthenticationController();
