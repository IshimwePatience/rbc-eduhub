const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const PreAssessment = sequelize.define('PreAssessment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: {
      model: 'courses',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passingScore: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 70,
    field: 'passing_score'
  },
  questions: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  isMandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_mandatory'
  },
  allowRetake: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'allow_retake'
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'max_attempts'
  },
  showResults: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'show_results'
  },
  showCorrectAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'show_correct_answers'
  },
  randomizeQuestions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'randomize_questions'
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
  }
}, {
  timestamps: true,
  tableName: 'pre_assessments',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['is_active'] }
  ]
});

module.exports = PreAssessment;
