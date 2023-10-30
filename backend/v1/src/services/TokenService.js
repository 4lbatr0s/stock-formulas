import ApiError from "../errors/ApiError.js";
import httpStatus from "http-status";
import RefreshToken from "../models/RefreshToken.js";
import CommonHelper from "../scripts/utils/helpers/CommonHelper.js";
import Messages from "../scripts/utils/constants/Messages.js";
import JWT from "jsonwebtoken";
class TokenService {
  async refresh(requestToken) {
    if (!requestToken) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: Messages.ERROR.TOKEN_REQUIRED });
    }

    try {
      let decoded = JWT.decode(requestToken);
      let refreshToken = await RefreshToken.findOne({ user: decoded?._id })
        .populate("user")
        .exec();
      if (!refreshToken) {
        throw new ApiError(
          Messages.ERROR.TOKEN_NOT_IN_DB,
          httpStatus.UNAUTHORIZED
        );
      }
      if (RefreshToken.verifyExpiration(refreshToken)) {
        throw new ApiError(Messages.ERROR.RESIGN, httpStatus.UNAUTHORIZED);
      }
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      let newAccessToken = CommonHelper.createAccessToken(refreshToken.user);
      //recreate refresh token
      let newRefreshToken = await RefreshToken.createToken(refreshToken.user);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ApiError(error?.message, error?.statusCode);
    }
  }
}

export default new TokenService(); // INFO: we can use the "this" keywod in the BaseService, because we create object instance here.
