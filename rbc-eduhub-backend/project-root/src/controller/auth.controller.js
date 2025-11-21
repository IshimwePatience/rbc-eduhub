// Auth controller: handles HTTP, calls auth service, returns JSON
const { signUp, login, refreshAuth, logout } = require('../services/auth.service');
const refreshTokenCookieName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';

// helper to standardize success
function ok(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

// helper to standardize error messages without leaking internals
function fail(res, error, status = 400) {
  const message = typeof error === 'string' ? error : error?.message || 'Request failed';
  return res.status(status).send(message);
}

const { EmailVerification } = require('../model');
const { sendMail } = require('../services/mailer.service');

async function signupController(req, res) {
  try {
    const { User } = require('../model');
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) return fail(res, 'Email already in use', 409);

    // Enforce allowed roles for public signup
    const allowedRoles = ['Learner', 'Instructor'];
    const payloadRoleName = req.body.roleName;
    const payloadRoleId = req.body.roleId;
    if (payloadRoleId) {
      // verify roleId corresponds to allowed role
      const Role = require('../model/User & Auth/Role');
      const role = await Role.findByPk(payloadRoleId);
      if (!role || !allowedRoles.includes(role.name)) {
        return fail(res, 'Invalid role for public signup', 400);
      }
    } else if (payloadRoleName) {
      if (!allowedRoles.includes(payloadRoleName)) return fail(res, 'Invalid role for public signup', 400);
    } else {
      // default to Learner if none provided
      req.body.roleName = 'Learner';
    }

    // Check for existing unused verification
    const existingVerification = await EmailVerification.findOne({
      where: {
        email: req.body.email,
        type: 'email_verification',
        used: false
      }
    });
    
    if (existingVerification) {
      console.log('DEBUG: Existing unused verification found, resending email');
      // Just resend the email with existing code
      await sendMail({
        to: req.body.email,
        subject: 'Verify your email',
        text: `Your verification code is: ${existingVerification.code}`,
        template: 'verification',
        templateData: {
          name: req.body.firstName,
          code: existingVerification.code,
          ttlMinutes: 15,
          year: new Date().getFullYear(),
          verifyUrl: `${process.env.FRONTEND_ORIGIN}/verify-email?email=${encodeURIComponent(req.body.email)}`
        }
      });
      return ok(res, { message: 'Verification code already sent. Please check your email.' }, 200);
    }

    // DELETE old records instead of UPDATE
    await EmailVerification.destroy({
      where: { email: req.body.email, type: 'email_verification' }
    });

    // Create new verification
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    
    await EmailVerification.create({
      email: req.body.email,
      code,
      type: 'email_verification',
      expiresAt,
      used: false,
      signupData: JSON.stringify(req.body),
    });

    // Send email
    await sendMail({
      to: req.body.email,
      subject: 'Verify your email',
      text: `Your verification code is: ${code}. It expires in 15 minutes.`,
      template: 'verification',
      templateData: {
        name: req.body.firstName,
        code,
        ttlMinutes: 15,
        year: new Date().getFullYear(),
        verifyUrl: `${process.env.FRONTEND_ORIGIN}/verify-email?email=${encodeURIComponent(req.body.email)}`
      }
    });

    return ok(res, { message: 'Verification code sent to email. Please verify to complete registration.' }, 201);
  } catch (err) {
    console.error('ERROR during signup:', err);
    return fail(res, err, 400);
  }
}

async function loginController(req, res) {
  try {
    const ip = req.ip || req.connection?.remoteAddress || '';
    const userAgent = req.get('User-Agent') || '';
    const result = await login({ email: req.body.email, password: req.body.password }, { ip, userAgent });

    // set refresh token in secure httpOnly cookie
    if (result.refreshToken) {
      const cookieOpts = {
        httpOnly: true,
        secure: String(process.env.COOKIE_SECURE || 'false') === 'true',
        sameSite: process.env.COOKIE_SAMESITE || 'Strict',
      };
      if (result.refreshTokenExpires) {
        const maxAge = new Date(result.refreshTokenExpires).getTime() - Date.now();
        if (!Number.isNaN(maxAge) && maxAge > 0) cookieOpts.maxAge = maxAge;
      }
      res.cookie(refreshTokenCookieName, result.refreshToken, cookieOpts);
      delete result.refreshToken;
      delete result.refreshTokenExpires;
    }

    return ok(res, result, 200);
  } catch (err) {
    if (/Invalid credentials/i.test(err.message)) return fail(res, 'Invalid credentials', 401);
    if (/disabled/i.test(err.message)) return fail(res, err, 403);
    return fail(res, err, 400);
  }
}

async function refreshTokenController(req, res) {
  try {
    const oldToken = req.cookies?.[refreshTokenCookieName] || req.body?.refreshToken;
    const ip = req.ip || req.connection?.remoteAddress || '';
    const userAgent = req.get('User-Agent') || '';
    const result = await refreshAuth(oldToken, ip, userAgent);

    if (result.refreshToken) {
      const cookieOpts = {
        httpOnly: true,
        secure: String(process.env.COOKIE_SECURE || 'false') === 'true',
        sameSite: process.env.COOKIE_SAMESITE || 'Strict',
      };
      res.cookie(refreshTokenCookieName, result.refreshToken, cookieOpts);
      delete result.refreshToken;
    }

    return ok(res, result, 200);
  } catch (err) {
    return fail(res, err, 401);
  }
}

async function logoutController(req, res) {
  try {
    const oldToken = req.cookies?.[refreshTokenCookieName] || req.body?.refreshToken;
    const ip = req.ip || req.connection?.remoteAddress || '';
    await logout(oldToken, ip);
    res.clearCookie(refreshTokenCookieName);
    return ok(res, { message: 'Logged out' }, 200);
  } catch (err) {
    return fail(res, err, 400);
  }
}

const { mfaSetup, mfaVerifySetup, mfaDisable, mfaVerifyLogin } = require('../services/auth.service');

async function mfaSetupController(req, res) {
  try {
    const result = await mfaSetup(req.auth?.sub);
    return ok(res, result, 200);
  } catch (err) { return fail(res, err, 400); }
}

async function mfaVerifySetupController(req, res) {
  try {
    const result = await mfaVerifySetup(req.auth?.sub, req.body.code);
    return ok(res, result, 200);
  } catch (err) { return fail(res, err, 400); }
}

async function mfaDisableController(req, res) {
  try {
    const result = await mfaDisable(req.auth?.sub, req.body.code);
    return ok(res, result, 200);
  } catch (err) { return fail(res, err, 400); }
}

async function mfaVerifyLoginController(req, res) {
  try {
    const result = await mfaVerifyLogin(req.body.mfaToken, req.body.code);
    return ok(res, result, 200);
  } catch (err) { return fail(res, err, 400); }
}

module.exports = {
  signupController,
  loginController,
  refreshTokenController,
  logoutController,
  mfaSetupController,
  mfaVerifySetupController,
  mfaDisableController,
  mfaVerifyLoginController,
};