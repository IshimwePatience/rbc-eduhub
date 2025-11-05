const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  type: { type: DataTypes.ENUM('airtel-money','mtn-momo','stripe-card'), allowNull: false },
  provider: { type: DataTypes.ENUM('airtel','mtn','stripe'), allowNull: false },
  isDefault: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_default' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  details: { type: DataTypes.JSONB, defaultValue: {} },
  billingAddress: { type: DataTypes.JSONB, defaultValue: {}, field: 'billing_address' },
  verificationStatus: { type: DataTypes.ENUM('pending','verified','failed'), defaultValue: 'pending', field: 'verification_status' },
  verifiedAt: { type: DataTypes.DATE, field: 'verified_at' },
  lastUsedAt: { type: DataTypes.DATE, field: 'last_used_at' },
  usageCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'usage_count' }
}, {
  timestamps: true,
  tableName: 'payment_methods',
  underscored: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['is_default'] },
    { fields: ['is_active'] }
  ]
});

module.exports = PaymentMethod;
