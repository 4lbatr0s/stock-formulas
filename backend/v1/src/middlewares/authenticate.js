import httpStatus from 'http-status';
import JWT, { TokenExpiredError } from 'jsonwebtoken';
import Messages from '../scripts/utils/constants/Messages';

// INFO: Middleware to analyze access token.

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

export default verifyToken;
