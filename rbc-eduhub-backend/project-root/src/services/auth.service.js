// Auth service: business logic for signup/login using Sequelize models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { sequelize } = require('../config/database');

// Models
const User = require('../model/User & Auth/User');
const Role = require('../model/User & Auth/Role');

function assertEnv() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set');
  }
}

function toPublicUser(u) {
  if (!u) return null;
  if (typeof u.toPublic === 'function') return u.toPublic();
  // fallback if model lacks toPublic
  return {
    fullName: `${u.firstName} ${u.lastName}`,
    email: u.email,
    phone: u.phone || null,
    isActive: u.isActive,
    isVerified: u.isVerified,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

async function signUp({
  firstName,
  lastName,
  email,
  password,
  roleName = 'Learner',
  roleId,
  phone,
  nationalId,
  jobTitle,
  organization,
  preferences,
  metadata,
  mfaEnabled,
  mfaSecret,
  isActive,
  isVerified,
}) {
  assertEnv();
  if (!firstName || !lastName || !email || !password) {
    throw new Error('firstName, lastName, email, password are required');
  }

  // Normalize
  const normEmail = String(email).toLowerCase().trim();

  return await sequelize.transaction(async (t) => {
    const existing = await User.findOne({ where: { email: normEmail }, transaction: t });
    if (existing) throw new Error('Email already in use');

    let role;
    if (roleId) {
      role = await Role.findByPk(roleId, { transaction: t });
    } else {
      role = await Role.findOne({ where: { name: roleName }, transaction: t });
    }
    if (!role) throw new Error('Role not found; seed roles first or provide a valid role');

    const user = await User.create({
      firstName,
      lastName,
      email: normEmail,
      password, // hashed by model hooks
      roleId: role.id,
      phone,
      nationalId,
      jobTitle,
      organization,
      preferences,
      metadata,
      mfaEnabled,
      mfaSecret,
      isActive,
      isVerified,
    }, { transaction: t });

    const token = jwt.sign({ sub: user.id, roleId: role.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { user: toPublicUser(user), token };
  });
}

async function login({ email, password }) {
  assertEnv();
  if (!email || !password) throw new Error('email and password are required');

  const normEmail = String(email).toLowerCase().trim();
  const user = await User.findOne({ where: { email: normEmail } });
  if (!user) throw new Error('Invalid credentials');
  if (user.isActive === false) throw new Error('Account is disabled');

  // Prefer instance method if present; fallback to bcrypt
  let ok = false;
  if (typeof user.comparePassword === 'function') {
    ok = await user.comparePassword(password);
  } else {
    ok = await bcrypt.compare(password, user.password);
  }
  if (!ok) throw new Error('Invalid credentials');

  // If MFA is enabled, return temp token and require step-2 verification
  if (user.mfaEnabled) {
    const mfaToken = jwt.sign({ sub: user.id, step: 'mfa' }, process.env.JWT_SECRET, { expiresIn: '10m' });
    return { requiresMfa: true, mfaToken };
  }

  await user.update({ lastLogin: new Date() });

  const token = jwt.sign({ sub: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { user: toPublicUser(user), token };
}

async function mfaSetup(userId) {
  if (!userId) throw new Error('Unauthorized');
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  const secret = speakeasy.generateSecret({ name: `RBC EduHub (${user.email})` });
  // Save secret but keep mfaEnabled false until verification
  await user.update({ mfaSecret: secret.base32 });
  const qrDataUrl = await qrcode.toDataURL(secret.otpauth_url);
  return { otpauthUrl: secret.otpauth_url, qr: qrDataUrl };
}

async function mfaVerifySetup(userId, token) {
  if (!userId) throw new Error('Unauthorized');
  const user = await User.findByPk(userId);
  if (!user || !user.mfaSecret) throw new Error('MFA not initialized');
  const verified = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: 'base32', token, window: 1 });
  if (!verified) throw new Error('Invalid MFA code');
  await user.update({ mfaEnabled: true });
  return { mfaEnabled: true };
}

async function mfaDisable(userId, token) {
  if (!userId) throw new Error('Unauthorized');
  const user = await User.findByPk(userId);
  if (!user || !user.mfaSecret) return { mfaEnabled: false };
  // Optionally require a current TOTP token for safety
  if (token) {
    const ok = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: 'base32', token, window: 1 });
    if (!ok) throw new Error('Invalid MFA code');
  }
  await user.update({ mfaEnabled: false, mfaSecret: null });
  return { mfaEnabled: false };
}

async function mfaVerifyLogin(mfaToken, code) {
  assertEnv();
  if (!mfaToken || !code) throw new Error('mfaToken and code are required');
  let payload;
  try {
    payload = jwt.verify(mfaToken, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error('MFA token invalid or expired');
  }
  if (payload.step !== 'mfa' || !payload.sub) throw new Error('Invalid MFA token');
  const user = await User.findByPk(payload.sub);
  if (!user || !user.mfaEnabled || !user.mfaSecret) throw new Error('MFA not enabled');
  const ok = speakeasy.totp.verify({ secret: user.mfaSecret, encoding: 'base32', token: code, window: 1 });
  if (!ok) throw new Error('Invalid MFA code');
  await user.update({ lastLogin: new Date() });
  const token = jwt.sign({ sub: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { user: toPublicUser(user), token };
}

module.exports = {
  signUp,
  login,
  mfaSetup,
  mfaVerifySetup,
  mfaDisable,
  mfaVerifyLogin,
};
