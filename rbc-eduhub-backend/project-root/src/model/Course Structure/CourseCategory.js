const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseCategory = sequelize.define('CourseCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('slug', value.toLowerCase());
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'parent_id',  // ← ADD THIS
    references: {
      model: 'course_categories',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'  // ← ADD THIS
  },
  courseCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'course_count'  // ← ADD THIS
  }
}, {
  timestamps: true,
  tableName: 'course_categories',
  underscored: true,  // ← ADD THIS
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['parent_id'] },  // ← CHANGE
    { fields: ['is_active'] },  // ← CHANGE
    { fields: ['order'] }
  ]
});

module.exports = CourseCategory;