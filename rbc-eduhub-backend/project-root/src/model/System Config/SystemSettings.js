const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SystemSettings = sequelize.define('SystemSettings', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  key: { type: DataTypes.STRING, allowNull: false, unique: true },
  category: { type: DataTypes.ENUM('general','email','sms','security','payment','storage','notifications','features','integrations','appearance'), allowNull: false },
  value: { type: DataTypes.JSONB, allowNull: false },
  dataType: { 
    type: DataTypes.ENUM('string','number','boolean','json','array'), 
    allowNull: false,
    field: 'data_type'  // ← ADD
  },
  description: { type: DataTypes.TEXT },
  isPublic: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false,
    field: 'is_public'  // ← ADD
  },
  isEditable: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: true,
    field: 'is_editable'  // ← ADD
  },
  validationRules: { 
    type: DataTypes.JSONB, 
    defaultValue: {},
    field: 'validation_rules'  // ← ADD
  },
  defaultValue: { 
    type: DataTypes.JSONB, 
    defaultValue: {},
    field: 'default_value'  // ← ADD
  },
  lastModifiedById: { 
    type: DataTypes.UUID, 
    allowNull: true,
    field: 'last_modified_by_id',  // ← ADD
    references: { model: 'users', key: 'id' }, 
    onDelete: 'SET NULL' 
  },
  metadata: { type: DataTypes.JSONB, defaultValue: {} }
}, {
  timestamps: true,
  tableName: 'system_settings',
  underscored: true,  // ← ADD
  indexes: [
    { unique: true, fields: ['key'] },
    { fields: ['category'] },
    { fields: ['is_public'] }  // ← CHANGE
  ]
});

module.exports = SystemSettings;