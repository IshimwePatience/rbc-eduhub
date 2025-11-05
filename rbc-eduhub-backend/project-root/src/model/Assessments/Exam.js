const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Exam = sequelize.define('Exam', {
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
  examType: {
    type: DataTypes.ENUM('midterm', 'final', 'certification', 'placement'),
    allowNull: false,
    field: 'exam_type'
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalMarks: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_marks'
  },
  passingScore: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    field: 'passing_score'
  },
  questions: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: []
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'scheduled_date'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date'
  },
  isProctored: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_proctored'
  },
  proctorSettings: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      webcamRequired: false,
      screenRecording: false,
      lockdownBrowser: false
    },
    field: 'proctor_settings'
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
    defaultValue: false,
    field: 'show_results'
  },
  showCorrectAnswers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'show_correct_answers'
  },
  randomizeQuestions: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'randomize_questions'
  },
  randomizeOptions: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'randomize_options'
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
  tableName: 'exams',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['exam_type'] },
    { fields: ['scheduled_date'] },
    { fields: ['is_active'] }
  ]
});

module.exports = Exam;
