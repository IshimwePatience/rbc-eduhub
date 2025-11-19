const { createAndSendVerification, verifyCode } = require('../services/verification.service');
const { User } = require('../model');

function ok(res, data, status = 200) { return res.status(status).json({ success: true, data }); }
function fail(res, err, status = 400) { const message = typeof err === 'string' ? err : err?.message || 'Request failed'; return res.status(status).send(message); }

async function sendVerificationController(req, res) {
  try {
    const { email } = req.body;
    if (!email) return fail(res, 'email required', 400);
    const user = await User.findOne({ where: { email } });
    const userId = user ? user.id : null;
    await createAndSendVerification({ userId, email, type: 'email_verification' });
    return ok(res, { message: 'Verification code sent' });
  } catch (e) { return fail(res, e, 500); }
}

async function verifyEmailController(req, res) {
  try {
    const { email, code } = req.body;
    await verifyCode({ email, code, type: 'email_verification' });
    return ok(res, { message: 'Email verified' });
  } catch (e) { return fail(res, e, 400); }
}

async function sendPasswordResetController(req, res) {
  try {
    const { email } = req.body;
    if (!email) return fail(res, 'email required', 400);
    const user = await User.findOne({ where: { email } });
    if (!user) return fail(res, 'User not found', 404);
    await createAndSendVerification({ userId: user.id, email, type: 'password_reset' });
    return ok(res, { message: 'Password reset code sent' });
  } catch (e) { return fail(res, e, 500); }
}

const { User: UserModel } = require('../model');
async function resetPasswordController(req, res) {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) return fail(res, 'email, code and newPassword required', 400);
    const rec = await verifyCode({ email, code, type: 'password_reset' });
    const user = await UserModel.findByPk(rec.userId);
    if (!user) return fail(res, 'User not found', 404);
    user.password = newPassword;
    await user.save();
    return ok(res, { message: 'Password reset successful' });
  } catch (e) { return fail(res, e, 400); }
}

// Resend verification code endpoint
const { EmailVerification } = require('../model');

async function resendVerificationCodeController(req, res) {
  try {
    const { email, type = 'email_verification' } = req.body;
    if (!email) return fail(res, 'email required', 400);
    await EmailVerification.update({ used: true }, {
      where: { email, type, used: false }
    });
    await createAndSendVerification({ userId: null, email, type });
    return ok(res, { message: 'New verification code sent' });
  } catch (e) {
    console.error('Resend code error:', e);
    let msg = e?.message || 'Failed to resend code';
    if (e?.response?.data?.message) msg += `: ${e.response.data.message}`;
    return fail(res, msg, 500);
  }
}

module.exports = {
  sendVerificationController,
  verifyEmailController,
  sendPasswordResetController,
  resetPasswordController,
  resendVerificationCodeController
};
