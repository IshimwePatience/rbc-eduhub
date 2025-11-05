const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ExamAttempt = sequelize.define('ExamAttempt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  examId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'exam_id',
    references: {
      model: 'exams',
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
  attemptNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'attempt_number'
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in-progress', 'submitted', 'graded', 'expired', 'cancelled'),
    defaultValue: 'scheduled'
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'started_at'
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'submitted_at'
  },
  timeSpent: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'time_spent'
  },
  score: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalMarks: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_marks'
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  passed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  answers: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  proctorData: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'proctor_data'
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
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_agent'
  }
}, {
  timestamps: true,
  tableName: 'exam_attempts',
  underscored: true,
  indexes: [
    { fields: ['exam_id', 'learner_id'] },
    { fields: ['learner_id', 'status'] },
    { fields: ['status'] },
    { fields: ['started_at'] }
  ]
});

module.exports = ExamAttempt;
