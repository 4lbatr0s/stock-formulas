import ApiError from "../errors/ApiError.js";
import Messages from "../scripts/utils/constants/Messages.js";
import UserService from "../services/Users.js";
import httpStatus from "http-status";
const checkEmailExist = async (res, userEmail) => {
  const user = await UserService.findOne({ email: userEmail });
  if (!user) {
    return next(new ApiError(Messages.ERROR.EMAIL_NOT_FOUND, httpStatus.NOT_FOUND))
  }
};

const checkCredentials = async (req, res, next) => {
  await checkEmailExist(res, req.body.email);
  next();
};

const verifyLogin = {
  checkCredentials,
};

export default verifyLogin;
