const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CDNConfiguration = sequelize.define('CDNConfiguration', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  provider: { type: DataTypes.ENUM('cloudflare','aws-cloudfront','azure-cdn','akamai','custom'), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_primary' },
  configuration: { type: DataTypes.JSONB, defaultValue: {} },
  regions: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  contentTypes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], field: 'content_types' },
  caching: { type: DataTypes.JSONB, defaultValue: {} },
  performance: { type: DataTypes.JSONB, defaultValue: {} },
  security: { type: DataTypes.JSONB, defaultValue: {} },
  statistics: { type: DataTypes.JSONB, defaultValue: {} },
  billing: { type: DataTypes.JSONB, defaultValue: {} },
  createdById: { type: DataTypes.UUID, allowNull: false, field: 'created_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
}, {
  timestamps: true,
  tableName: 'cdn_configurations',
  underscored: true,
  indexes: [
    { fields: ['provider'] },
    { fields: ['is_active'] },
    { fields: ['is_primary'] }
  ]
});

module.exports = CDNConfiguration;
