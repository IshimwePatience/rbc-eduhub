const { EmailVerification, User } = require('../model');
const { Op } = require('sequelize');
const { sendMail } = require('./mailer.service');

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createAndSendVerification({ userId, email, type = 'email_verification', ttlMinutes = 15, name }) {
  if (!email) throw new Error('Email required');
  // Mark previous codes as used/expired for this email/type
  await EmailVerification.update({ used: true }, {
    where: { email, type, used: false }
  });
  const code = generateCode();
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
  const rec = await EmailVerification.create({ userId, email, code, type, expiresAt });

  const subject = type === 'password_reset' ? 'Password reset code' : 'Verify your email';
  const text = `Your verification code is: ${code}. It expires in ${ttlMinutes} minutes.`;
  let template, templateData;
  const year = new Date().getFullYear();
  if (type === 'password_reset') {
    template = 'password-reset';
    templateData = {
      name,
      code,
      ttlMinutes,
      year,
      resetUrl: `${process.env.FRONTEND_ORIGIN}/reset-password?email=${encodeURIComponent(email)}`
    };
  } else {
    template = 'verification';
    templateData = {
      name,
      code,
      ttlMinutes,
      year,
      verifyUrl: `${process.env.FRONTEND_ORIGIN}/verify-email?email=${encodeURIComponent(email)}`
    };
  }
  try {
    await sendMail({ to: email, subject, text, template, templateData });
  } catch (e) {
    // swallow send errors but record could be used to retry
    console.error('Failed to send verification email', e && e.message);
  }
  return rec;
}

async function verifyCode({ email, code, type = 'email_verification' }) {
  if (!email || !code) throw new Error('email and code required');
  const now = new Date();

  const rec = await EmailVerification.findOne({
    where: {
      email,
      code,
      type,
      used: false,
      expiresAt: { [Op.gt]: now },
    },
    order: [['createdAt', 'DESC']],
  });

  if (!rec) throw new Error('Invalid or expired code');

  const latestCode = await EmailVerification.findOne({
    where: {
      email,
      type,
      used: false,
      expiresAt: { [Op.gt]: now },
    },
    order: [['createdAt', 'DESC']],
  });

  if (latestCode && latestCode.code !== code) {
    throw new Error('Code does not match the most recent one sent');
  }

  if (type === 'email_verification' && rec.signupData) {
    try {
      const { User, Role } = require('../model');
      const { sendMail } = require('./mailer.service');
      const data = JSON.parse(rec.signupData);

      const exists = await User.findOne({ where: { email } });
      if (exists) throw new Error('User already exists');

      let roleId = data.roleId;
      let roleName = data.roleName;
      let role = null;
      if (!roleId && roleName) {
        role = await Role.findOne({ where: { name: roleName } });
        if (!role) throw new Error('Role not found');
        roleId = role.id;
      } else if (roleId) {
        role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');
        roleName = role.name;
      }

      if (!roleId) {
        throw new Error('Role ID or Role Name is required to create a user');
      }

      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        password: data.password,
        roleId,
        phone: data.phone,
        nationalId: data.nationalId,
        jobTitle: data.jobTitle,
        organization: data.organization,
        resident: data.resident,
        isVerified: true,
        isActive: true,
      });

      // Send welcome email after successful signup
      await sendMail({
        to: user.email,
        subject: 'Welcome to RBC EduHub!',
        template: 'welcome-success',
        templateData: {
          name: user.firstName,
          roleName: roleName || (role && role.name) || 'User',
          year: new Date().getFullYear()
        }
      });
    } catch (e) {
      throw e;
    }
  }

  rec.used = true;
  await rec.save();
  return rec;
}

module.exports = { createAndSendVerification, verifyCode };
