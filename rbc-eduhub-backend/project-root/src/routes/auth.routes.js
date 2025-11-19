const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signupController, loginController, mfaSetupController, mfaVerifySetupController, mfaDisableController, mfaVerifyLoginController } = require('../controller/auth.controller');
const { sendVerificationController, verifyEmailController, sendPasswordResetController, resetPasswordController, resendVerificationCodeController } = require('../controller/verification.controller');
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

// Email verification endpoints
router.post('/send-verification', sendVerificationController);
router.post('/verify-email', verifyEmailController);
router.post('/resend-code', resendVerificationCodeController);

// Password reset endpoints
router.post('/forgot-password', sendPasswordResetController);
router.post('/reset-password', resetPasswordController);

// MFA routes
router.post('/mfa/setup', requireAuth, mfaSetupController);
router.post('/mfa/verify-setup', requireAuth, mfaVerifySetupController);
router.post('/mfa/disable', requireAuth, mfaDisableController);
// POST /api/auth/mfa/verify-login (step 2)
router.post('/mfa/verify-login', mfaVerifyLoginController);

// Refresh and logout
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

// Set role for current user (uses refresh token cookie to identify the user after social login)
router.post('/set-role', async (req, res) => {
	try {
		const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
		const oldToken = req.cookies?.[cookieName] || req.body?.refreshToken;
		if (!oldToken) return res.status(401).json({ success: false, message: 'No auth token' });
		const tokenService = require('../services/token.service');
		const rec = await tokenService.findRefreshToken(oldToken);
		if (!rec || rec.revoked) return res.status(401).json({ success: false, message: 'Invalid token' });
		const userId = rec.userId;
		const { User } = require('../model');
		const user = await User.findByPk(userId);
		if (!user) return res.status(404).json({ success: false, message: 'User not found' });

		const { roleId, roleName } = req.body;
		const Role = require('../model/User & Auth/Role');
		let role;
		if (roleId) role = await Role.findByPk(roleId);
		else if (roleName) role = await Role.findOne({ where: { name: roleName } });
		if (!role) return res.status(400).json({ success: false, message: 'Invalid role' });

				user.roleId = role.id;
				await user.save();
				// Send welcome email with role name
				const { sendMail } = require('../services/mailer.service');
				await sendMail({
					to: user.email,
					subject: 'Welcome to RBC EduHub!',
					template: 'welcome-success',
					templateData: {
						name: user.firstName,
						roleName: role.name,
						year: new Date().getFullYear()
					}
				});
				// return public user
				const authService = require('../services/auth.service');
				return res.json({ success: true, user: authService.toPublicUser(user) });
	} catch (e) {
		return res.status(500).json({ success: false, message: e.message || 'Failed to set role' });
	}
});

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
		let frontend = process.env.FRONTEND_AUTH_SUCCESS_URL || process.env.FRONTEND_ORIGIN || '/';
		if (req.user && req.user.__isNew) {
			frontend += (frontend.includes('?') ? '&' : '?') + 'newUser=1';
		}
		return res.redirect(frontend);
	} catch (e) {
		return res.redirect(process.env.FRONTEND_AUTH_FAILURE_URL || process.env.FRONTEND_ORIGIN || '/');
	}
});

// Social auth (LinkedIn)
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { session: false }), async (req, res) => {
	try {
		const ip = req.ip || req.connection?.remoteAddress || '';
		const userAgent = req.get('User-Agent') || '';
		const tokens = await createTokensForUser(req.user, { ip, userAgent });
		const cookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
		const cookieOpts = { httpOnly: true, secure: String(process.env.COOKIE_SECURE || 'false') === 'true', sameSite: process.env.COOKIE_SAMESITE || 'Strict' };
		res.cookie(cookieName, tokens.refreshToken, cookieOpts);
		let frontend = process.env.FRONTEND_AUTH_SUCCESS_URL || process.env.FRONTEND_ORIGIN || '/';
		if (req.user && req.user.__isNew) {
			frontend += (frontend.includes('?') ? '&' : '?') + 'newUser=1';
		}
		return res.redirect(frontend);
	} catch (e) {
		return res.redirect(process.env.FRONTEND_AUTH_FAILURE_URL || process.env.FRONTEND_ORIGIN || '/');
	}
});

// List available roles (public) - used by frontend to present choices after social signup
router.get('/roles', async (req, res) => {
	try {
		const Role = require('../model/User & Auth/Role');
		const roles = await Role.findAll({ attributes: ['id', 'name', 'description'] });
		return res.json({ success: true, roles });
	} catch (e) {
		return res.status(500).json({ success: false, message: e.message || 'Failed to fetch roles' });
	}
});

module.exports = router;
