const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseEnrollment = sequelize.define('CourseEnrollment', {
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
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'learner_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  enrollmentType: {
    type: DataTypes.ENUM('self', 'admin-assigned', 'mandatory', 'invitation'),
    defaultValue: 'self',
    field: 'enrollment_type'
  },
  enrolledById: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'enrolled_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'dropped', 'suspended', 'expired'),
    defaultValue: 'active'
  },
  progress: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'start_date'
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'completed_at'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'expires_at'
  },
  lastAccessedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_accessed_at'
  },
  score: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      current: 0,
      total: 0,
      percentage: 0
    }
  },
  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'certificate_issued'
  },
  certificateId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'certificate_id',
    references: {
      model: 'certificates',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'course_enrollments',
  underscored: true,
  indexes: [
    { fields: ['course_id', 'learner_id'], unique: true },
    { fields: ['learner_id', 'status'] },
    { fields: ['course_id', 'status'] },
    { fields: ['enrollment_type'] }
  ]
});

module.exports = CourseEnrollment;
