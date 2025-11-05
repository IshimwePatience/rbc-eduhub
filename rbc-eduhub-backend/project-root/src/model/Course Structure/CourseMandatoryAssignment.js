const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseMandatoryAssignment = sequelize.define('CourseMandatoryAssignment', {
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
  assignedById: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'assigned_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  assignmentType: {
    type: DataTypes.ENUM('role-based', 'user-based', 'organization-based', 'department-based'),
    allowNull: false,
    field: 'assignment_type'
  },
  targetRoles: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: [],
    field: 'target_roles'
  },
  targetUsers: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: [],
    field: 'target_users'
  },
  targetOrganizations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'target_organizations'
  },
  targetDepartments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'target_departments'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'due_date'
  },
  reminderSchedule: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'reminder_schedule'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  autoEnroll: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'auto_enroll'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'course_mandatory_assignments',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['assignment_type'] },
    { fields: ['is_active'] }
  ]
});

module.exports = CourseMandatoryAssignment;
