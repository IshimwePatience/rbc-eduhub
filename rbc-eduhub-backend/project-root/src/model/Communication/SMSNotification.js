const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SMSNotification = sequelize.define('SMSNotification', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  recipientId: { type: DataTypes.UUID, allowNull: false, field: 'recipient_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, field: 'phone_number' },
  message: { type: DataTypes.STRING(1600), allowNull: false },
  notificationType: { type: DataTypes.ENUM('enrollment','course-reminder','assignment-due','live-session-reminder','exam-reminder','otp','mfa-code','announcement','custom'), allowNull: false, field: 'notification_type' },
  status: { type: DataTypes.ENUM('pending','sent','delivered','failed','undelivered'), defaultValue: 'pending' },
  sentAt: { type: DataTypes.DATE, field: 'sent_at' },
  deliveredAt: { type: DataTypes.DATE, field: 'delivered_at' },
  failedAt: { type: DataTypes.DATE, field: 'failed_at' },
  errorMessage: { type: DataTypes.STRING, field: 'error_message' },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  priority: { type: DataTypes.ENUM('low','normal','high','urgent'), defaultValue: 'normal' },
  metadata: { type: DataTypes.JSONB, defaultValue: {} },
  scheduledFor: { type: DataTypes.DATE, field: 'scheduled_for' },
  provider: { type: DataTypes.ENUM('twilio','africastalking','nexmo','custom'), defaultValue: 'twilio' },
  providerId: { type: DataTypes.STRING, field: 'provider_id' },
  cost: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
}, {
  timestamps: true,
  tableName: 'sms_notifications',
  underscored: true,
  indexes: [
    { fields: ['recipient_id'] },
    { fields: ['status'] },
    { fields: ['notification_type'] },
    { fields: ['scheduled_for'] },
    { fields: ['sent_at'] }
  ]
});

module.exports = SMSNotification;
