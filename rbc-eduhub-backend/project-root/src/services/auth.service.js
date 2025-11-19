// Auth service: business logic for signup/login using Sequelize models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

// Models
const User = require('../model/User & Auth/User');
const Role = require('../model/User & Auth/Role');

// Token service for refresh-token management
const tokenService = require('./token.service');

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
    roleId: u.roleId || null,
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

    console.log('DEBUG: Checking role for user signup');
    let role;
    if (roleId) {
      role = await Role.findByPk(roleId, { transaction: t });
    } else {
      role = await Role.findOne({
        where: {
          [Op.or]: [
            { name: roleName },
            { slug: roleName }
          ]
        },
        transaction: t
      });
    }
    if (!role) throw new Error('Role not found; seed roles first or provide a valid role');

    console.log('DEBUG: Creating user with normalized email:', normEmail);
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

    console.log('DEBUG: User created successfully:', user);

    const token = jwt.sign({ sub: user.id, roleId: role.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { user: toPublicUser(user), token };
  });
}

async function login({ email, password }, { ip, userAgent } = {}) {
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

  // create access token
  const accessExpiry = process.env.JWT_ACCESS_EXPIRES || '15m';
  const accessToken = jwt.sign({ sub: user.id, roleId: user.roleId, jti: uuidv4() }, process.env.JWT_SECRET, { expiresIn: accessExpiry });

  // create refresh token and persist hashed version
  const { token: refreshTokenPlain, expires } = tokenService.generateRefreshToken();
  await tokenService.saveRefreshToken(user.id, refreshTokenPlain, expires, ip, userAgent);

  return { user: toPublicUser(user), accessToken, refreshToken: refreshTokenPlain, refreshTokenExpires: expires };
}

async function refreshAuth(oldRefreshToken, ip, userAgent) {
  assertEnv();
  if (!oldRefreshToken) throw new Error('Refresh token required');

  const rec = await tokenService.findRefreshToken(oldRefreshToken);
  if (!rec || rec.revoked) throw new Error('Invalid refresh token');
  if (new Date() > new Date(rec.expiresAt)) throw new Error('Refresh token expired');

  const user = await User.findByPk(rec.userId);
  if (!user) throw new Error('User not found');

  // generate new access token
  const accessExpiry = process.env.JWT_ACCESS_EXPIRES || '15m';
  const accessToken = jwt.sign({ sub: user.id, roleId: user.roleId, jti: uuidv4() }, process.env.JWT_SECRET, { expiresIn: accessExpiry });

  // rotate refresh token
  const { newToken } = await tokenService.rotateRefreshToken(oldRefreshToken, user.id, ip, userAgent);

  return { user: toPublicUser(user), accessToken, refreshToken: newToken };
}

async function logout(refreshToken, ip) {
  if (!refreshToken) return null;
  const hash = tokenService.hashToken(refreshToken);
  return await tokenService.revokeRefreshTokenByHash(hash, ip);
}

async function createTokensForUser(user, { ip, userAgent } = {}) {
  const { v4: uuidv4 } = require('uuid');
  const accessExpiry = process.env.JWT_ACCESS_EXPIRES || '15m';
  const accessToken = jwt.sign({ sub: user.id, roleId: user.roleId, jti: uuidv4() }, process.env.JWT_SECRET, { expiresIn: accessExpiry });
  const { token: refreshTokenPlain, expires } = tokenService.generateRefreshToken();
  await tokenService.saveRefreshToken(user.id, refreshTokenPlain, expires, ip, userAgent);
  return { accessToken, refreshToken: refreshTokenPlain, refreshTokenExpires: expires };
}

async function socialSignIn(provider, profile, tokens = {}) {
  // find or create SocialAuth record, link to existing user by email or create new user
  const { SocialAuth } = require('../model');
  // providerId field in profile: different providers have different shapes
  const providerId = profile.id;
  const email = (profile.emails && profile.emails[0] && profile.emails[0].value) ? profile.emails[0].value.toLowerCase() : null;
  const displayName = profile.displayName || '';
  const photo = (profile.photos && profile.photos[0] && profile.photos[0].value) ? profile.photos[0].value : null;

  let social = await SocialAuth.findOne({ where: { provider, providerId } });
  const UserModel = require('../model/User & Auth/User');
  if (social) {
    // update tokens
    await social.update({
      accessToken: tokens.accessToken || social.accessToken,
      refreshToken: tokens.refreshToken || social.refreshToken,
      tokenExpiresAt: tokens.expiresAt || social.tokenExpiresAt,
      lastUsed: new Date(),
      isActive: true,
      displayName: displayName || social.displayName,
      profilePhoto: photo || social.profilePhoto,
      email: email || social.email
    });
    const user = await UserModel.findByPk(social.userId);
    if (user) return user;
  }

  // not found by provider id: try to find user by email
  if (email) {
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      // If this is a new social signup attempt, throw error for duplicate email
      throw new Error('User already exists with this email');
    }
  }

  // no user: auto-create a new user with default Learner role
  const Role = require('../model/User & Auth/Role');
  const role = await Role.findOne({ where: { name: 'Learner' } });
  const nameParts = String(displayName || '').split(' ');
  const firstName = nameParts.shift() || 'Social';
  const lastName = nameParts.join(' ') || 'User';
  const newUser = await UserModel.create({ firstName, lastName, email: email || `${provider}_${providerId}@example.local`, password: Math.random().toString(36).slice(2), roleId: role ? role.id : null, isVerified: !!email, isActive: true });
  // mark as newly created so caller (passport) can detect and prompt for role selection
  try { newUser.__isNew = true; } catch (e) { /* ignore */ }
  // create social record
  await SocialAuth.create({ userId: newUser.id, provider, providerId, email: email || null, displayName, profilePhoto: photo, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, tokenExpiresAt: tokens.expiresAt });
  return newUser;
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
  refreshAuth,
  logout,
  createTokensForUser,
  socialSignIn,
  mfaSetup,
  mfaVerifySetup,
  mfaDisable,
  mfaVerifyLogin,
};
