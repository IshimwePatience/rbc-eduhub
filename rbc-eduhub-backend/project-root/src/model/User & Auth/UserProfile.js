const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const UserProfile = sequelize.define('UserProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'profile_image'
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'date_of_birth'
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer-not-to-say'),
    allowNull: true
  },
  address: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  organization: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'job_title'
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'employee_id'
  },
  bio: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  education: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  experience: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  certifications: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  socialLinks: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'social_links'
  },
  emergencyContact: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'emergency_contact'
  }
}, {
  timestamps: true,
  tableName: 'user_profiles',
  underscored: true,
  indexes: [
    { fields: ['user_id'], unique: true }
  ]
});

module.exports = UserProfile;
