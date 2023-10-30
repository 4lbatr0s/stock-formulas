import express from 'express';
import schemas from '../validations/Users.js';
import validate from '../middlewares/validate.js';
import AuthenticationController from '../controllers/Authentication.js';
import authenticate from '../middlewares/authenticate.js';
import idChecker from '../middlewares/idChecker.js';
import verifySignup from '../middlewares/verifySignup.js';
import verifyLogin from '../middlewares/verifyLogin.js';

const router = express.Router();
router.route('/register').post(validate(schemas.createValidation), [verifySignup.checkDuplicateNameOrEmail, verifySignup.checkRoleExisted], AuthenticationController.register);
router.route('/login').post(validate(schemas.loginValidation), verifyLogin.checkCredentials,  AuthenticationController.login);

export default router;
