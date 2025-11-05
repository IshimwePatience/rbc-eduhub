const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ExternalContentProvider = sequelize.define('ExternalContentProvider', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  providerType: { type: DataTypes.ENUM('lti','scorm-cloud','youtube','vimeo','custom-api'), allowNull: false, field: 'provider_type' },
  description: { type: DataTypes.TEXT },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  configuration: { type: DataTypes.JSONB, defaultValue: {} },
  authMethod: { type: DataTypes.ENUM('oauth1','oauth2','api-key','basic','lti'), defaultValue: 'api-key', field: 'auth_method' },
  accessToken: { type: DataTypes.STRING, field: 'access_token' },
  refreshToken: { type: DataTypes.STRING, field: 'refresh_token' },
  tokenExpiresAt: { type: DataTypes.DATE, field: 'token_expires_at' },
  supportedContentTypes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], field: 'supported_content_types' },
  rateLimits: { type: DataTypes.JSONB, defaultValue: {}, field: 'rate_limits' },
  usage: { type: DataTypes.JSONB, defaultValue: {} },
  createdById: { type: DataTypes.UUID, allowNull: false, field: 'created_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  settings: { type: DataTypes.JSONB, defaultValue: { autoSync: false, syncInterval: null, enableWebhooks: false, webhookUrl: null } }
}, {
  timestamps: true,
  tableName: 'external_content_providers',
  underscored: true,
  indexes: [
    { fields: ['provider_type'] },
    { fields: ['is_active'] },
    { fields: ['created_by_id'] }
  ]
});

module.exports = ExternalContentProvider;
