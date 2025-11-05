const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'question_text'
  },
  questionType: {
    type: DataTypes.ENUM('multiple-choice', 'true-false', 'short-answer', 'essay', 'fill-in-blank', 'matching'),
    allowNull: false,
    field: 'question_type'
  },
  points: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: []
  },
  correctAnswer: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'correct_answer'
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'created_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  timestamps: true,
  tableName: 'questions',
  underscored: true,
  indexes: [
    { fields: ['question_type'] },
    { fields: ['difficulty'] },
    { fields: ['created_by_id'] },
    { fields: ['tags'], using: 'gin' }
  ]
});

module.exports = Question;
