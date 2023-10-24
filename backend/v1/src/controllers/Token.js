import { fileURLToPath } from "url";
import path from "path";
import httpStatus from "http-status";
import UserService from "../services/Users.js";
import Helper from "../scripts/utils/helpers/CommonHelper.js";
import ApiError from "../errors/ApiError.js";
import ApiNotFoundError from "../errors/ApiNotFoundError.js";
import Messages from "../scripts/utils/constants/Messages.js";
import RefreshToken from "../models/RefreshToken.js";

const __filename = fileURLToPath(import.meta.url); // get all name
const __dirname = path.dirname(__filename); // get dir name from it.

class TokenController {
  async refresh(req, res, next) {
    const { refreshToken: requestToken } = req.body;
    if (!requestToken) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: Messages.ERROR.TOKEN_REQUIRED });
    }

    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken })
        .populated("user")
        .exec();
      if (!refreshToken) {
        return res.status(403).send({ error: Messages.ERROR.TOKEN_NOT_IN_DB });
      }
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.findByIdAndRemove(refreshToken._id, {
          useFindAndModify: false,
        }).exec();

        return res.status(403).send({ error: Messages.ERROR.RESIGN });
      }

      let newAccessToken = Helper.createAccessToken(refreshToken.user);
      //recreate refresh token
      let newRefreshToken = await RefreshToken.createToken(user);

      return res.status(httpStatus.OK).send({
        accssToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return next(new ApiError(error?.message, error?.statusCode));
    }
  }
}

export default new TokenController();
