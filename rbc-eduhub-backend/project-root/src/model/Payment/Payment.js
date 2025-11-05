const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  transactionId: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'transaction_id' },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
  enrollmentId: { type: DataTypes.UUID, allowNull: true, field: 'enrollment_id', references: { model: 'course_enrollments', key: 'id' }, onDelete: 'SET NULL' },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'RWF' },
  paymentMethod: { type: DataTypes.ENUM('airtel-money','mtn-momo','stripe','free'), allowNull: false, field: 'payment_method' },
  paymentProvider: { type: DataTypes.ENUM('airtel','mtn','stripe','system'), field: 'payment_provider' },
  status: { type: DataTypes.ENUM('pending','processing','completed','failed','cancelled','refunded'), defaultValue: 'pending' },
  paymentDetails: { type: DataTypes.JSONB, defaultValue: {}, field: 'payment_details' },
  providerResponse: { type: DataTypes.JSONB, defaultValue: {}, field: 'provider_response' },
  paymentDate: { type: DataTypes.DATE, field: 'payment_date' },
  completedAt: { type: DataTypes.DATE, field: 'completed_at' },
  failedAt: { type: DataTypes.DATE, field: 'failed_at' },
  failureReason: { type: DataTypes.STRING, field: 'failure_reason' },
  retryCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'retry_count' },
  invoiceId: { type: DataTypes.UUID, allowNull: true, field: 'invoice_id', references: { model: 'invoices', key: 'id' }, onDelete: 'SET NULL' },
  refundId: { type: DataTypes.UUID, allowNull: true, field: 'refund_id', references: { model: 'refunds', key: 'id' }, onDelete: 'SET NULL' },
  ipAddress: { type: DataTypes.STRING, field: 'ip_address' },
  userAgent: { type: DataTypes.STRING, field: 'user_agent' },
  metadata: { type: DataTypes.JSONB, defaultValue: {} }
}, {
  timestamps: true,
  tableName: 'payments',
  underscored: true,
  indexes: [
    { unique: true, fields: ['transaction_id'] },
    { fields: ['user_id'] },
    { fields: ['course_id'] },
    { fields: ['status'] },
    { fields: ['payment_method'] },
    { fields: ['created_at'] }
  ]
});

Payment.prototype.toPublic = function() {
  return {
    transactionId: this.transactionId,
    amount: this.amount,
    currency: this.currency,
    paymentMethod: this.paymentMethod,
    paymentProvider: this.paymentProvider,
    status: this.status,
    paymentDate: this.paymentDate,
    completedAt: this.completedAt,
    failedAt: this.failedAt,
  };
};

module.exports = Payment;
