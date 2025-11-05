const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseModule = sequelize.define('CourseModule', {
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
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  learningObjectives: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'learning_objectives'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_published'
  },
  unlockConditions: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      previousModuleRequired: true
    },
    field: 'unlock_conditions'
  },
  resources: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  }
}, {
  timestamps: true,
  tableName: 'course_modules',
  underscored: true,
  indexes: [
    { fields: ['course_id', 'order'] },
    { fields: ['is_published'] }
  ]
});

module.exports = CourseModule;
