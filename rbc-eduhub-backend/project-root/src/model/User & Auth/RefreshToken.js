const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const RefreshToken = sequelize.define('RefreshToken', {
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
  tokenHash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'token_hash'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at'
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  replacedByToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'replaced_by_token'
  },
  createdByIp: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'created_by_ip'
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'revoked_at'
  },
  revokedByIp: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'revoked_by_ip'
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_agent'
  }
}, {
  tableName: 'refresh_tokens',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['token_hash'] }
  ]
});

module.exports = RefreshToken;
