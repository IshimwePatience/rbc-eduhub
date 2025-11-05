// Auth controller: handles HTTP, calls auth service, returns JSON
const { signUp, login } = require('../services/auth.service');

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
    const result = await login({ email: req.body.email, password: req.body.password });
    return ok(res, result, 200);
  } catch (err) {
    if (/Invalid credentials/i.test(err.message)) return fail(res, 'Invalid credentials', 401);
    if (/disabled/i.test(err.message)) return fail(res, err, 403);
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
  mfaSetupController,
  mfaVerifySetupController,
  mfaDisableController,
  mfaVerifyLoginController,
};
