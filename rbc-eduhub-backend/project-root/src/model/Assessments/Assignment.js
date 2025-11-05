const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Assignment = sequelize.define('Assignment', {
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
    allowNull: false
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
  totalMarks: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_marks'
  },
  passingScore: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 70,
    field: 'passing_score'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'due_date'
  },
  allowLateSubmission: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'allow_late_submission'
  },
  latePenalty: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'late_penalty'
  },
  submissionType: {
    type: DataTypes.ENUM('file', 'text', 'link', 'both'),
    defaultValue: 'file',
    field: 'submission_type'
  },
  allowedFileTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'allowed_file_types'
  },
  maxFileSize: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'max_file_size'
  },
  attachments: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  rubric: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
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
  tableName: 'assignments',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['module_id'] },
    { fields: ['due_date'] },
    { fields: ['is_active'] }
  ]
});

module.exports = Assignment;
