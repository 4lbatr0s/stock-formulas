import express from 'express';
import schemas from '../validations/Users.js';
import validate from '../middlewares/validate.js';
import TokenController from '../controllers/Token.js';
import idChecker from '../middlewares/idChecker.js';
import verifySignup from '../middlewares/verifySignup.js';
import verifyLogin from '../middlewares/verifyLogin.js';

const router = express.Router();

router.route('/refresh').post(validate(schemas.refreshTokenValidation), TokenController.refresh);

export default router;
