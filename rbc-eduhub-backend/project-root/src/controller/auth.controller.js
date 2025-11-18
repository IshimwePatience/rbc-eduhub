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
  return res.status(status).json({ success: false, message });
}

async function signupController(req, res) {
  try {
    const result = await signUp({ ...req.body });
    return ok(res, result, 201);
  } catch (err) {
    // conflict on email
    if (/already in use/i.test(err.message)) return fail(res, err, 409);
    if (/Role not found/i.test(err.message)) return fail(res, err, 422);
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
      // don't expose refresh token in response body
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

    // set new refresh token cookie
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
    // clear cookie
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
