import Messages from "../scripts/utils/constants/Messages.js";
import UserService from "../services/Users.js";

const checkEmailExist = async (res, userEmail) => {
  const user = await UserService.findOne({ email: userEmail });
  if (user) {
    return res.status(404).send({ error: Messages.ERROR.EMAIL_IN_USE });
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
