const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ContentCompletion = sequelize.define('ContentCompletion', {
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
  contentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'content_id',
    references: { model: 'course_contents', key: 'id' },
    onDelete: 'CASCADE'
  },
  contentType: {
    type: DataTypes.ENUM('video', 'document', 'audio', 'scorm', 'quiz', 'assignment', 'text', 'external-link'),
    allowNull: false,
    field: 'content_type'
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
  timeSpent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'time_spent' },
  startedAt: { type: DataTypes.DATE, allowNull: true, field: 'started_at' },
  completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
  lastAccessedAt: { type: DataTypes.DATE, allowNull: true, field: 'last_accessed_at' },
  lastPosition: { type: DataTypes.INTEGER, defaultValue: 0, field: 'last_position' },
  attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  score: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  passed: { type: DataTypes.BOOLEAN, allowNull: true },
  interactions: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] }
}, {
  timestamps: true,
  tableName: 'content_completions',
  underscored: true,
  indexes: [
    { fields: ['learner_id', 'content_id'], unique: true },
    { fields: ['learner_id', 'module_id'] },
    { fields: ['learner_id', 'course_id'] },
    { fields: ['content_id', 'status'] },
    { fields: ['status'] },
    { fields: ['last_accessed_at'] }
  ]
});

module.exports = ContentCompletion;
