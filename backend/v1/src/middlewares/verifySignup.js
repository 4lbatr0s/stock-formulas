import httpStatus from "http-status";
import UserService from "../services/Users.js";
import Messages from "../scripts/utils/constants/Messages.js";
import roles from "../scripts/utils/constants/Roles.js";

const checkDuplicateNameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await UserService.findOne({
      username: req.body.username,
    });
    if (userByUsername) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(Messages.ERROR.USERNAME_IN_USE);
    }
    const userByEmail = await UserService.findOne({
      username: req.body.username,
    });
    if (userByEmail) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(Messages.ERROR.EMAIL_IN_USE);
    }
    next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const checkRoleExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!roles.includes(req.body.roles[i])) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .json(Messages.ERROR.roleNotExist(req.body.roles[i]));
        }
      }
    }
    next();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const verifySignup = {
  checkDuplicateNameOrEmail,
  checkRoleExisted,
};

export default verifySignup;
