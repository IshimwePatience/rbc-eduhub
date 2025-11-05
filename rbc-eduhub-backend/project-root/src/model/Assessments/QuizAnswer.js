const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const QuizAnswer = sequelize.define('QuizAnswer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  attemptId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'attempt_id',
    references: {
      model: 'quiz_attempts',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'question_id',
    references: {
      model: 'questions',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  selectedAnswer: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'selected_answer'
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_correct'
  },
  pointsAwarded: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'points_awarded'
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  answeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'answered_at'
  }
}, {
  timestamps: true,
  tableName: 'quiz_answers',
  underscored: true,
  indexes: [
    { fields: ['attempt_id', 'question_id'] },
    { fields: ['question_id'] }
  ]
});

module.exports = QuizAnswer;
