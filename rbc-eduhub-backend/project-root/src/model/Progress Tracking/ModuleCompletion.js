const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ModuleCompletion = sequelize.define('ModuleCompletion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'learner_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: { model: 'courses', key: 'id' },
    onDelete: 'CASCADE'
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'module_id',
    references: { model: 'course_modules', key: 'id' },
    onDelete: 'CASCADE'
  },
  status: {
    type: DataTypes.ENUM('not-started', 'in-progress', 'completed'),
    defaultValue: 'not-started'
  },
  progress: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    validate: { min: 0, max: 100 }
  },
  completedContent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'completed_content' },
  totalContent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_content' },
  timeSpent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'time_spent' },
  startedAt: { type: DataTypes.DATE, allowNull: true, field: 'started_at' },
  completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
  lastAccessedAt: { type: DataTypes.DATE, allowNull: true, field: 'last_accessed_at' },
  score: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  totalScore: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'total_score' },
  passed: { type: DataTypes.BOOLEAN, allowNull: true }
}, {
  timestamps: true,
  tableName: 'module_completions',
  underscored: true,
  indexes: [
    { fields: ['learner_id', 'module_id'], unique: true },
    { fields: ['learner_id', 'course_id'] },
    { fields: ['module_id', 'status'] },
    { fields: ['status'] }
  ]
});

module.exports = ModuleCompletion;
