const express = require('express');
const validate = require('../middlewares/validate');
const sanitize = require('../middlewares/sanitize');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.register), sanitize.sanitizeUser, authController.register);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/change-password', auth(), validate(authValidation.changePassword), authController.changePassword);
module.exports = router;
