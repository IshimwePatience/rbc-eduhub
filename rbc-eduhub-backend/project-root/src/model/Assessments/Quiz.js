const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
  moduleId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'module_id',
    references: {
      model: 'course_modules',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
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
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passingScore: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 70,
    field: 'passing_score'
  },
  totalMarks: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_marks'
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
  allowRetake: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'allow_retake'
  },
  maxAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
    field: 'max_attempts'
  },
  showResults: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'show_results'
  },
  showCorrectAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'show_correct_answers'
  },
  randomizeQuestions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'randomize_questions'
  },
  randomizeOptions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'randomize_options'
  },
  availableFrom: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'available_from'
  },
  availableUntil: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'available_until'
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
  tableName: 'quizzes',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['module_id'] },
    { fields: ['is_active'] }
  ]
});

module.exports = Quiz;
