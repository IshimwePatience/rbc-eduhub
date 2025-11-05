const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SystemUsageStats = sequelize.define('SystemUsageStats', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  date: { type: DataTypes.DATE, allowNull: false },
  period: { type: DataTypes.ENUM('daily','weekly','monthly','yearly'), defaultValue: 'daily' },
  users: { type: DataTypes.JSONB, defaultValue: {} },
  courses: { type: DataTypes.JSONB, defaultValue: {} },
  enrollments: { type: DataTypes.JSONB, defaultValue: {} },
  content: { type: DataTypes.JSONB, defaultValue: {} },
  assessments: { type: DataTypes.JSONB, defaultValue: {} },
  engagement: { type: DataTypes.JSONB, defaultValue: {} },
  liveSessions: { type: DataTypes.JSONB, defaultValue: {}, field: 'live_sessions' },
  certificates: { type: DataTypes.JSONB, defaultValue: {} },
  communication: { type: DataTypes.JSONB, defaultValue: {} },
  performance: { type: DataTypes.JSONB, defaultValue: {} },
  revenue: { type: DataTypes.JSONB, defaultValue: { amount: 0, currency: 'RWF' } }
}, {
  timestamps: true,
  tableName: 'system_usage_stats',
  underscored: true,
  indexes: [
    { fields: ['date'] },
    { fields: ['period'] }
  ]
});

module.exports = SystemUsageStats;
