const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseContent = sequelize.define('CourseContent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'module_id',
    references: {
      model: 'course_modules',
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
  contentType: {
    type: DataTypes.ENUM('video', 'document', 'audio', 'scorm', 'quiz', 'assignment', 'text', 'external-link'),
    allowNull: false,
    field: 'content_type'
  },
  contentReferenceId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'content_reference_id'
  },
  contentModel: {
    type: DataTypes.ENUM('Video', 'Document', 'Audio', 'SCORMPackage', 'Quiz', 'Assignment'),
    allowNull: true,
    field: 'content_model'
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_required'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_published'
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_free'
  },
  unlockConditions: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      previousContentRequired: true
    },
    field: 'unlock_conditions'
  },
  completionCriteria: {
    type: DataTypes.ENUM('view', 'time-spent', 'score', 'manual'),
    defaultValue: 'view',
    field: 'completion_criteria'
  },
  minimumTimeRequired: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'minimum_time_required'
  },
  minimumScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'minimum_score'
  }
}, {
  timestamps: true,
  tableName: 'course_contents',
  underscored: true,
  indexes: [
    { fields: ['module_id', 'order'] },
    { fields: ['content_type'] },
    { fields: ['is_published'] }
  ]
});

module.exports = CourseContent;
