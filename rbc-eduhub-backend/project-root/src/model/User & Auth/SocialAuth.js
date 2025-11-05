const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SocialAuth = sequelize.define('SocialAuth', {
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
  provider: {
    type: DataTypes.ENUM('google', 'linkedin'),
    allowNull: false
  },
  providerId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'provider_id'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'display_name'
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'profile_photo'
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'access_token'
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'refresh_token'
  },
  tokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'token_expires_at'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  lastUsed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'last_used'
  }
}, {
  timestamps: true,
  tableName: 'social_auths',
  underscored: true,
  indexes: [
    { fields: ['user_id', 'provider'] },
    { fields: ['provider_id', 'provider'], unique: true },
    { fields: ['email'] }
  ]
});

module.exports = SocialAuth;
