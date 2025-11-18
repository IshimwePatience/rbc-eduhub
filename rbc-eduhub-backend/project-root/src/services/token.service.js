const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { RefreshToken } = require('../model');

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function generateRefreshToken() {
  // returns plaintext token (to send to client) and expiry date
  const token = crypto.randomBytes(64).toString('hex');
  const days = parseInt(process.env.JWT_REFRESH_EXPIRES_DAYS || '30', 10);
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return { token, expires };
}

async function saveRefreshToken(userId, token, expiresAt, ip, userAgent) {
  const tokenHash = hashToken(token);
  const record = await RefreshToken.create({
    userId,
    tokenHash,
    expiresAt,
    createdByIp: ip,
    userAgent
  });
  return record;
}

async function revokeRefreshTokenByHash(tokenHash, ip) {
  const rec = await RefreshToken.findOne({ where: { tokenHash } });
  if (!rec) return null;
  rec.revoked = true;
  rec.revokedAt = new Date();
  rec.revokedByIp = ip || null;
  await rec.save();
  return rec;
}

async function findRefreshToken(token) {
  const tokenHash = hashToken(token);
  const rec = await RefreshToken.findOne({ where: { tokenHash } });
  return rec;
}

async function rotateRefreshToken(oldToken, userId, ip, userAgent) {
  // verify old token
  const oldHash = hashToken(oldToken);
  const rec = await RefreshToken.findOne({ where: { tokenHash: oldHash } });
  if (!rec || rec.revoked) throw new Error('Invalid refresh token');
  if (new Date() > new Date(rec.expiresAt)) throw new Error('Refresh token expired');
  if (String(rec.userId) !== String(userId)) throw new Error('Token user mismatch');

  // generate new token and save
  const { token: newToken, expires } = generateRefreshToken();
  const newHash = hashToken(newToken);
  // mark old as revoked and set replacedByToken to newHash (store hash)
  rec.revoked = true;
  rec.revokedAt = new Date();
  rec.revokedByIp = ip || null;
  rec.replacedByToken = newHash;
  await rec.save();

  const newRec = await RefreshToken.create({
    userId,
    tokenHash: newHash,
    expiresAt: expires,
    createdByIp: ip,
    userAgent
  });

  return { newToken, newRec };
}

module.exports = {
  generateRefreshToken,
  saveRefreshToken,
  findRefreshToken,
  revokeRefreshTokenByHash,
  rotateRefreshToken,
  hashToken
};
