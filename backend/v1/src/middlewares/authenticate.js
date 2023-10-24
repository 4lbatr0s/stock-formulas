import httpStatus from 'http-status';
import JWT from 'jsonwebtoken';
import Messages from '../scripts/utils/constants/Messages.js';
import UserService from '../services/Users.js';
import Role from '../models/Role.js';
import ApiError from '../errors/ApiError.js';
import { roleEnum } from '../scripts/utils/constants/Roles.js';
import { HttpStatusCode } from 'axios';
// INFO: Middleware to analyze access token.

const { TokenExpiredError } = JWT;

const catchError = (err, res) => {
  if(err instanceof TokenExpiredError){
    return res.status(httpStatus.UNAUTHORIZED).send(Messages.ERROR.TOKEN_EXPIRED);
  }
  return res.status(httpStatus.UNAUTHORIZED).send(Messages.ERROR.UNAUTHORIZED);
}


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.Authorization;
  const token = req.headers?.authorization?.split(' ')[1] || null;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'YOU ARE NOT LOGGED IN' });

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => { // INFO: user here is the object we pass when we create token, its in the Helper class.
    if (error) return catchError(error, res);
    /**
         * INFO: we just get token from the user, if we validate it, we put user to request.
         * This way, we can do operations on the user.
         */
    req.user = user;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = UserService.find(req.user._id)
    if(!user){
      return res.status(httpStatus.NOT_FOUND).send({ error: Messages.ERROR.USER_NOT_FOUND });
    }
    const roles = await Role.find(
      {
        _id:{ $in: user.roles }
      }
    ).exec();
    for(let role of roles){
      if(role.name === roleEnum.ADMIN){
        next();
      }
      else{
        return res.status(HttpStatusCode.Forbidden).send({ error: Messages.ERROR.FORBIDDEN })
      }
    }
  } catch (error) {
    throw new ApiError(error?.message, error?.statusCode);
  }
}

const authenticatationMiddleware = {
  verifyToken, isAdmin
}

export default authenticatationMiddleware;
