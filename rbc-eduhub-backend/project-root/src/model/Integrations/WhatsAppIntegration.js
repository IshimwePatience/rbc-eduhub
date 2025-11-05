const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const WhatsAppIntegration = sequelize.define('WhatsAppIntegration', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'WhatsApp Business API' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  provider: { type: DataTypes.ENUM('twilio','messagebird','infobip','custom'), allowNull: false },
  configuration: { type: DataTypes.JSONB, defaultValue: {} },
  whatsappNumber: { type: DataTypes.STRING, allowNull: false, field: 'whatsapp_number' },
  displayName: { type: DataTypes.STRING, field: 'display_name' },
  verificationStatus: { type: DataTypes.ENUM('pending','verified','failed'), defaultValue: 'pending', field: 'verification_status' },
  features: { type: DataTypes.JSONB, defaultValue: {} },
  messageTemplates: { type: DataTypes.JSONB, defaultValue: [], field: 'message_templates' },
  usageQuota: { type: DataTypes.JSONB, defaultValue: {}, field: 'usage_quota' },
  statistics: { type: DataTypes.JSONB, defaultValue: {} },
  notificationTypes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], field: 'notification_types' },
  rateLimits: { type: DataTypes.JSONB, defaultValue: {}, field: 'rate_limits' },
  createdById: { type: DataTypes.UUID, allowNull: false, field: 'created_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
}, {
  timestamps: true,
  tableName: 'whatsapp_integrations',
  underscored: true,
  indexes: [
    { fields: ['is_active'] },
    { fields: ['verification_status'] }
  ]
});

module.exports = WhatsAppIntegration;
