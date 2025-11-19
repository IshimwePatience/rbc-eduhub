const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const EmailVerification = sequelize.define('EmailVerification', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: true, field: 'user_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  email: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('email_verification','password_reset'), allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
  used: { type: DataTypes.BOOLEAN, defaultValue: false },
  signupData: { type: DataTypes.TEXT, allowNull: true }
}, {
  timestamps: true,
  tableName: 'email_verifications',
  underscored: true,
  indexes: [ { fields: ['user_id'] }, { fields: ['email'] }, { fields: ['type'] } ]
});

module.exports = EmailVerification;
