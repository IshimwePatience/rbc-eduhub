const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Refund = sequelize.define('Refund', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  refundId: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'refund_id' },
  paymentId: { type: DataTypes.UUID, allowNull: false, field: 'payment_id', references: { model: 'payments', key: 'id' }, onDelete: 'CASCADE' },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'RWF' },
  reason: { type: DataTypes.ENUM('course-cancelled','duplicate-payment','unsatisfied','technical-issue','accidental-purchase','other'), allowNull: false },
  reasonDescription: { type: DataTypes.STRING(500), field: 'reason_description' },
  status: { type: DataTypes.ENUM('pending','processing','completed','failed','rejected'), defaultValue: 'pending' },
  refundMethod: { type: DataTypes.ENUM('airtel-money','mtn-momo','stripe','original-method'), defaultValue: 'original-method', field: 'refund_method' },
  requestedById: { type: DataTypes.UUID, allowNull: false, field: 'requested_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  requestedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'requested_at' },
  approvedById: { type: DataTypes.UUID, allowNull: true, field: 'approved_by_id', references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
  approvedAt: { type: DataTypes.DATE, field: 'approved_at' },
  processedAt: { type: DataTypes.DATE, field: 'processed_at' },
  completedAt: { type: DataTypes.DATE, field: 'completed_at' },
  failedAt: { type: DataTypes.DATE, field: 'failed_at' },
  failureReason: { type: DataTypes.STRING, field: 'failure_reason' },
  providerResponse: { type: DataTypes.JSONB, defaultValue: {}, field: 'provider_response' },
  notes: { type: DataTypes.STRING },
  adminNotes: { type: DataTypes.STRING, field: 'admin_notes' }
}, {
  timestamps: true,
  tableName: 'refunds',
  underscored: true,
  indexes: [
    { unique: true, fields: ['refund_id'] },
    { fields: ['payment_id'] },
    { fields: ['user_id'] },
    { fields: ['status'] },
    { fields: ['requested_at'] }
  ]
});

module.exports = Refund;
