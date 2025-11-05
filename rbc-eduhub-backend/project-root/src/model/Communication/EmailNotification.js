const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const EmailNotification = sequelize.define('EmailNotification', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  recipientId: { type: DataTypes.UUID, allowNull: false, field: 'recipient_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  recipientEmail: { type: DataTypes.STRING, allowNull: false, field: 'recipient_email' },
  subject: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  htmlBody: { type: DataTypes.TEXT, field: 'html_body' },
  notificationType: {
    type: DataTypes.ENUM('welcome','enrollment','course-completion','certificate-issued','assignment-due','quiz-reminder','live-session-reminder','password-reset','account-verification','grade-published','announcement','custom'),
    allowNull: false,
    field: 'notification_type'
  },
  status: { type: DataTypes.ENUM('pending','sent','failed','bounced'), defaultValue: 'pending' },
  sentAt: { type: DataTypes.DATE, field: 'sent_at' },
  failedAt: { type: DataTypes.DATE, field: 'failed_at' },
  errorMessage: { type: DataTypes.STRING, field: 'error_message' },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  priority: { type: DataTypes.ENUM('low','normal','high','urgent'), defaultValue: 'normal' },
  attachments: { type: DataTypes.JSONB, defaultValue: [] },
  metadata: { type: DataTypes.JSONB, defaultValue: {} },
  scheduledFor: { type: DataTypes.DATE, field: 'scheduled_for' },
  templateId: { type: DataTypes.STRING, field: 'template_id' },
  provider: { type: DataTypes.ENUM('smtp','sendgrid','mailgun','ses'), defaultValue: 'smtp' },
  providerId: { type: DataTypes.STRING, field: 'provider_id' }
}, {
  timestamps: true,
  tableName: 'email_notifications',
  underscored: true,
  indexes: [
    { fields: ['recipient_id'] },
    { fields: ['status'] },
    { fields: ['notification_type'] },
    { fields: ['scheduled_for'] },
    { fields: ['sent_at'] }
  ]
});

module.exports = EmailNotification;
