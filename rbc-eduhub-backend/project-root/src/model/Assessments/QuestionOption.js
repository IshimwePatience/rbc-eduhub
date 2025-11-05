const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const QuestionOption = sequelize.define('QuestionOption', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
  optionText: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'option_text'
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_correct'
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'question_options',
  underscored: true,
  indexes: [
    { fields: ['question_id', 'order'] }
  ]
});

module.exports = QuestionOption;
