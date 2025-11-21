const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signupController, loginController, mfaSetupController, mfaVerifySetupController, mfaDisableController, mfaVerifyLoginController, getProfileController } = require('../controller/auth.controller');
// Get current user profile (requires authentication)
const { requireAuth } = require('../middleware/auth.middleware');
router.get('/profile', requireAuth, getProfileController);
const { sendVerificationController, verifyEmailController, sendPasswordResetController, resetPasswordController, resendVerificationCodeController } = require('../controller/verification.controller');
const { refreshTokenController, logoutController } = require('../controller/auth.controller');
const { createTokensForUser } = require('../services/auth.service');
const { validate } = require('../middleware/validation.middleware');
const { signupValidation, loginValidation } = require('../middleware/validators/auth.validators');
const { verifyRecaptcha } = require('../middleware/recaptcha.middleware');
// const { requireAuth } = require('../middleware/auth.middleware');

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

// Institutional registration - creates an Organization Admin account
router.post('/register-institution', async (req, res) => {
	try {
		const { firstName, lastName, email, password, organization, country } = req.body;
		if (!email || !firstName || !lastName || !organization || !password) return res.status(400).json({ success: false, message: 'firstName, lastName, email, organization and password are required' });
		const { EmailVerification, User } = require('../model');
		const exists = await User.findOne({ where: { email } });
		if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });
		const Role = require('../model/User & Auth/Role');
		const role = await Role.findOne({ where: { name: 'Admin' } });
		if (!role) return res.status(500).json({ success: false, message: 'Admin role not configured' });
		// Remove any previous unused verifications
		await EmailVerification.destroy({ where: { email, type: 'email_verification' } });
		// Create verification record with signupData
		const code = Math.floor(100000 + Math.random() * 900000).toString();
		const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
		const signupData = JSON.stringify({ firstName, lastName, email, password, organization, country, roleId: role.id, roleName: role.name });
		await EmailVerification.create({ email, code, type: 'email_verification', expiresAt, used: false, signupData });
		// Send verification email
		const { sendMail } = require('../services/mailer.service');
		await sendMail({
			to: email,
			subject: 'Verify your email',
			text: `Your verification code is: ${code}. It expires in 15 minutes.`,
			template: 'verification',
			templateData: {
				name: firstName,
				code,
				ttlMinutes: 15,
				year: new Date().getFullYear(),
				verifyUrl: `${process.env.FRONTEND_ORIGIN}/verify-email?email=${encodeURIComponent(email)}`
			}
		});
		return res.json({ success: true, message: 'Verification code sent to email. Please verify to complete registration.' });
	} catch (e) {
		return res.status(500).json({ success: false, message: e.message || 'Failed to register institution' });
	}
});

// Super Admin registration (private) - requires platform secret
router.post('/register-superadmin', async (req, res) => {
	try {
		const { firstName, lastName, email, password, secret } = req.body;
		const platformSecret = process.env.SUPERADMIN_SECRET;
		if (!platformSecret) return res.status(500).json({ success: false, message: 'Super admin secret not configured' });
		if (!secret || secret !== platformSecret) return res.status(401).json({ success: false, message: 'Invalid platform secret' });
		if (!email || !firstName || !lastName || !password) return res.status(400).json({ success: false, message: 'firstName, lastName, email and password are required' });
		const { EmailVerification, User } = require('../model');
		const exists = await User.findOne({ where: { email } });
		if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });
		const Role = require('../model/User & Auth/Role');
		const role = await Role.findOne({ where: { name: 'Super Admin' } });
		if (!role) return res.status(500).json({ success: false, message: 'Super Admin role not configured' });
		// Remove any previous unused verifications
		await EmailVerification.destroy({ where: { email, type: 'email_verification' } });
		// Create verification record with signupData
		const code = Math.floor(100000 + Math.random() * 900000).toString();
		const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
		const signupData = JSON.stringify({ firstName, lastName, email, password, roleId: role.id, roleName: role.name });
		await EmailVerification.create({ email, code, type: 'email_verification', expiresAt, used: false, signupData });
		// Send verification email
		const { sendMail } = require('../services/mailer.service');
		await sendMail({
			to: email,
			subject: 'Verify your email',
			text: `Your verification code is: ${code}. It expires in 15 minutes.`,
			template: 'verification',
			templateData: {
				name: firstName,
				code,
				ttlMinutes: 15,
				year: new Date().getFullYear(),
				verifyUrl: `${process.env.FRONTEND_ORIGIN}/verify-email?email=${encodeURIComponent(email)}`
			}
		});
		return res.json({ success: true, message: 'Verification code sent to email. Please verify to complete registration.' });
	} catch (e) {
		return res.status(500).json({ success: false, message: e.message || 'Failed to register super admin' });
	}
});

module.exports = router;
