const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const xAPIStatement = sequelize.define('xAPIStatement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  actor: { type: DataTypes.JSONB, allowNull: false },
  verb: { type: DataTypes.JSONB, allowNull: false },
  object: { type: DataTypes.JSONB, allowNull: false },
  result: { type: DataTypes.JSONB, allowNull: true },
  context: { type: DataTypes.JSONB, allowNull: true },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  stored: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  authority: { type: DataTypes.JSONB, allowNull: true },
  version: { type: DataTypes.STRING, defaultValue: '1.0.0' },
  attachments: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }
}, {
  timestamps: true,
  tableName: 'xapi_statements',
  indexes: [
    { fields: ['timestamp'] }
  ]
});

module.exports = xAPIStatement;
