const express = require('express');
const router = express.Router();
const { signupController, loginController, mfaSetupController, mfaVerifySetupController, mfaDisableController, mfaVerifyLoginController } = require('../controller/auth.controller');
const { validate } = require('../middleware/validation.middleware');
const { signupValidation, loginValidation } = require('../middleware/validators/auth.validators');
const { verifyRecaptcha } = require('../middleware/recaptcha.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

// POST /api/auth/signup
router.post('/signup', verifyRecaptcha, validate(signupValidation), signupController);

// POST /api/auth/login (step 1)
router.post('/login', verifyRecaptcha, validate(loginValidation), loginController);

// MFA routes
router.post('/mfa/setup', requireAuth, mfaSetupController);
router.post('/mfa/verify-setup', requireAuth, mfaVerifySetupController);
router.post('/mfa/disable', requireAuth, mfaDisableController);
// POST /api/auth/mfa/verify-login (step 2)
router.post('/mfa/verify-login', mfaVerifyLoginController);

module.exports = router;
