const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseAnalytics = sequelize.define('CourseAnalytics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: { model: 'courses', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  date: { type: DataTypes.DATE, allowNull: false },
  period: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
    defaultValue: 'daily'
  },
  enrollments: { type: DataTypes.JSONB, defaultValue: {} },
  engagement: { type: DataTypes.JSONB, defaultValue: {} },
  assessments: { type: DataTypes.JSONB, defaultValue: {} },
  discussions: { type: DataTypes.JSONB, defaultValue: {} },
  liveSessions: { type: DataTypes.JSONB, defaultValue: {}, field: 'live_sessions' },
  certificates: { type: DataTypes.JSONB, defaultValue: {} },
  ratings: { type: DataTypes.JSONB, defaultValue: {} },
  revenue: { type: DataTypes.JSONB, defaultValue: { amount: 0, currency: 'RWF' } }
}, {
  timestamps: true,
  tableName: 'course_analytics',
  underscored: true,
  indexes: [
    { fields: ['course_id', 'date'] },
    { fields: ['course_id', 'period'] },
    { fields: ['date'] }
  ]
});

module.exports = CourseAnalytics;
