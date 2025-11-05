const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const LearnerProgress = sequelize.define('LearnerProgress', {
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: { model: 'courses', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  enrollmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'enrollment_id',
    references: { model: 'course_enrollments', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  overallProgress: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'overall_progress',
    validate: { min: 0, max: 100 }
  },
  completedModules: { type: DataTypes.INTEGER, defaultValue: 0, field: 'completed_modules' },
  totalModules: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_modules' },
  completedContent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'completed_content' },
  totalContent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_content' },
  completedAssessments: { type: DataTypes.INTEGER, defaultValue: 0, field: 'completed_assessments' },
  totalAssessments: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_assessments' },
  totalTimeSpent: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_time_spent' },
  lastAccessedAt: { type: DataTypes.DATE, allowNull: true, field: 'last_accessed_at' },
  lastAccessedContentId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'last_accessed_content_id',
    references: { model: 'course_contents', key: 'id' },
    onDelete: 'SET NULL'
  },
  currentModuleId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'current_module_id',
    references: { model: 'course_modules', key: 'id' },
    onDelete: 'SET NULL'
  },
  averageScore: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0, field: 'average_score' },
  totalScore: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'total_score' },
  maxScore: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'max_score' },
  completionStatus: {
    type: DataTypes.ENUM('not-started', 'in-progress', 'completed', 'abandoned'),
    defaultValue: 'not-started',
    field: 'completion_status'
  },
  startedAt: { type: DataTypes.DATE, allowNull: true, field: 'started_at' },
  completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' },
  certificateEligible: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'certificate_eligible' },
  milestones: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
  streakDays: { type: DataTypes.INTEGER, defaultValue: 0, field: 'streak_days' },
  lastActivityDate: { type: DataTypes.DATE, allowNull: true, field: 'last_activity_date' }
}, {
  timestamps: true,
  tableName: 'learner_progress',
  underscored: true,
  indexes: [
    { fields: ['learner_id', 'course_id'], unique: true },
    { fields: ['learner_id'] },
    { fields: ['course_id'] },
    { fields: ['completion_status'] },
    { fields: ['last_accessed_at'] }
  ]
});

module.exports = LearnerProgress;
