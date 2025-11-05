const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const AssignmentSubmission = sequelize.define('AssignmentSubmission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  assignmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'assignment_id',
    references: {
      model: 'assignments',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'learner_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  submissionType: {
    type: DataTypes.ENUM('file', 'text', 'link', 'both'),
    allowNull: false,
    field: 'submission_type'
  },
  textSubmission: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'text_submission'
  },
  linkSubmission: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'link_submission'
  },
  files: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('draft', 'submitted', 'graded', 'returned', 'resubmitted'),
    defaultValue: 'draft'
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'submitted_at'
  },
  isLate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_late'
  },
  score: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  totalMarks: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'total_marks'
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  passed: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  gradedById: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'graded_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  gradedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'graded_at'
  },
  attemptNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'attempt_number'
  }
}, {
  timestamps: true,
  tableName: 'assignment_submissions',
  underscored: true,
  indexes: [
    { fields: ['assignment_id', 'learner_id'] },
    { fields: ['learner_id', 'status'] },
    { fields: ['status'] },
    { fields: ['submitted_at'] }
  ]
});

module.exports = AssignmentSubmission;
