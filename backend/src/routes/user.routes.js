const express = require('express')
const userController = require('../controllers/user.controller');
const { isAuthenicated } = require('../middlewares/isAuthenticated');
const {validateUser , userSchema} = require('../validators/user.validator')
const router = express.Router();

router.post('/register',validateUser(userSchema), userController.registerUser);
router.post('/verify', userController.verification);
router.post('/login', userController.loginUser);
router.post('/logout',isAuthenicated, userController.logoutUser);
router.post('/forget-password', userController.forgotPassword);
router.post('/verify-otp/:email', userController.verifyOtp);
router.post('/new-password/:email', userController.changePassword);


module.exports = router;