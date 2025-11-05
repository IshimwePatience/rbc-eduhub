const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const MoHIntegration = sequelize.define('MoHIntegration', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  systemName: { type: DataTypes.STRING, allowNull: false, field: 'system_name' },
  systemType: { type: DataTypes.ENUM('health-information-system','hr-system','certificate-registry','cpd-system','custom'), allowNull: false, field: 'system_type' },
  description: { type: DataTypes.TEXT },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  endpoint: { type: DataTypes.JSONB, defaultValue: {} },
  authentication: { type: DataTypes.JSONB, defaultValue: {} },
  dataMapping: { type: DataTypes.JSONB, defaultValue: {}, field: 'data_mapping' },
  syncSettings: { type: DataTypes.JSONB, defaultValue: {}, field: 'sync_settings' },
  dataTypes: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], field: 'data_types' },
  webhooks: { type: DataTypes.JSONB, defaultValue: {} },
  usage: { type: DataTypes.JSONB, defaultValue: {} },
  compliance: { type: DataTypes.JSONB, defaultValue: {} },
  createdById: { type: DataTypes.UUID, allowNull: false, field: 'created_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
}, {
  timestamps: true,
  tableName: 'moh_integrations',
  underscored: true,
  indexes: [
    { fields: ['system_type'] },
    { fields: ['is_active'] }
  ]
});

module.exports = MoHIntegration;
