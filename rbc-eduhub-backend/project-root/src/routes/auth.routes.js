const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signupController, loginController, mfaSetupController, mfaVerifySetupController, mfaDisableController, mfaVerifyLoginController } = require('../controller/auth.controller');
const { refreshTokenController, logoutController } = require('../controller/auth.controller');
const { createTokensForUser } = require('../services/auth.service');
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

// Refresh and logout
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

// Social auth (Google)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
	try {
		// req.user is the user instance returned by passport verify (socialSignIn)
		const ip = req.ip || req.connection?.remoteAddress || '';
		const userAgent = req.get('User-Agent') || '';
		const tokens = await createTokensForUser(req.user, { ip, userAgent });
		// set refresh cookie and redirect to frontend
		const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
		const cookieOpts = { httpOnly: true, secure: String(process.env.COOKIE_SECURE || 'false') === 'true', sameSite: process.env.COOKIE_SAMESITE || 'Strict' };
		res.cookie(cookieName, tokens.refreshToken, cookieOpts);
		const frontend = process.env.FRONTEND_AUTH_SUCCESS_URL || process.env.FRONTEND_ORIGIN || '/';
		return res.redirect(frontend);
	} catch (e) {
		return res.redirect(process.env.FRONTEND_AUTH_FAILURE_URL || process.env.FRONTEND_ORIGIN || '/');
	}
});

// Social auth (LinkedIn)
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: false }), async (req, res) => {
	try {
		const ip = req.ip || req.connection?.remoteAddress || '';
		const userAgent = req.get('User-Agent') || '';
		const tokens = await createTokensForUser(req.user, { ip, userAgent });
		const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
		const cookieOpts = { httpOnly: true, secure: String(process.env.COOKIE_SECURE || 'false') === 'true', sameSite: process.env.COOKIE_SAMESITE || 'Strict' };
		res.cookie(cookieName, tokens.refreshToken, cookieOpts);
		const frontend = process.env.FRONTEND_AUTH_SUCCESS_URL || process.env.FRONTEND_ORIGIN || '/';
		return res.redirect(frontend);
	} catch (e) {
		return res.redirect(process.env.FRONTEND_AUTH_FAILURE_URL || process.env.FRONTEND_ORIGIN || '/');
	}
});

module.exports = router;
