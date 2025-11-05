const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const QuizAttempt = sequelize.define('QuizAttempt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quizId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'quiz_id',
    references: {
      model: 'quizzes',
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
    type: DataTypes.ENUM('in-progress', 'submitted', 'graded', 'expired'),
    defaultValue: 'in-progress'
  },
  startedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: []
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
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
  tableName: 'quiz_attempts',
  underscored: true,
  indexes: [
    { fields: ['quiz_id', 'learner_id'] },
    { fields: ['learner_id', 'status'] },
    { fields: ['status'] }
  ]
});

module.exports = QuizAttempt;
