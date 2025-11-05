const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Session = sequelize.define('Session', {
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
    allowNull: false,
    unique: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'refresh_token'
  },
  deviceInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'device_info'
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at'
  },
  lastActivity: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'last_activity'
  },
  logoutAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'logout_at'
  }
}, {
  timestamps: true,
  tableName: 'sessions',
  underscored: true,
  indexes: [
    { fields: ['token'], unique: true },
    { fields: ['user_id'] },
    { fields: ['expires_at'] },
    { fields: ['is_active'] }
  ]
});

Session.prototype.isExpired = function() {
  return new Date() > this.expiresAt;
};

Session.prototype.refresh = function(expirationTime) {
  this.expiresAt = new Date(Date.now() + expirationTime);
  this.lastActivity = new Date();
  return this.save();
};

module.exports = Session;