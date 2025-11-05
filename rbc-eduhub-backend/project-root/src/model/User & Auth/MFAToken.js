const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const crypto = require('crypto');

const MFAToken = sequelize.define('MFAToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('email', 'sms', 'authenticator'),
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 600000),
    field: 'expires_at'
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_used'
  },
  usedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'used_at'
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    field: 'max_attempts'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address'
  }
}, {
  timestamps: true,
  tableName: 'mfa_tokens',
  underscored: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['token'] },
    { fields: ['expires_at'] },
    { fields: ['is_used'] }
  ]
});

MFAToken.generateToken = function(length = 6) {
  return crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
};

MFAToken.prototype.isExpired = function() {
  return new Date() > this.expiresAt || this.isUsed;
};

MFAToken.prototype.verify = function(token) {
  if (this.isExpired() || this.attempts >= this.maxAttempts) {
    return false;
  }
  
  this.attempts += 1;
  
  if (this.token === token) {
    this.isUsed = true;
    this.usedAt = new Date();
    return true;
  }
  
  return false;
};

module.exports = MFAToken;
