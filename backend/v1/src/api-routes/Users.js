import express from 'express';
import schemas from '../validations/Users.js';
import validate from '../middlewares/validate.js';
import UsersController from '../controllers/Users.js';
import authenticate from '../middlewares/authenticate.js';
import idChecker from '../middlewares/idChecker.js';

const router = express.Router();

router.get('/', authenticate.verifyToken, UsersController.list);
router.route('/:userId').post(idChecker(), authenticate.verifyToken, UsersController.getUserById);
router.get('/current-user', authenticate.verifyToken, UsersController.getUserDetails);
router.route('/login').post(validate(schemas.loginValidation), UsersController.login);
router.route('/').patch(authenticate.verifyToken, validate(schemas.updateValidation), UsersController.update);
router.route('/reset-password').post(validate(schemas.resetPasswordValidation), UsersController.resetPassword);
router.route('/change-password').post(authenticate.verifyToken, validate(schemas.changePasswordValidation), UsersController.changePassword);
router.route('/:id').delete(idChecker(), authenticate.verifyToken, UsersController.remove);
router.route('/update-profile-image').post(authenticate.verifyToken, UsersController.updateProfileImage);

export default router;
