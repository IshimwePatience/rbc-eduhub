const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SCORMPackage = sequelize.define('SCORMPackage', {
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
  uploadedById: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'uploaded_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  packageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'package_url'
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'file_name'
  },
  fileSize: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'file_size'
  },
  scormVersion: {
    type: DataTypes.ENUM('1.2', '2004'),
    allowNull: false,
    field: 'scorm_version'
  },
  manifestUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'manifest_url'
  },
  launchUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'launch_url'
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  extractionStatus: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      status: 'pending'
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  cdn: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      enabled: false
    }
  },
  launches: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  timestamps: true,
  tableName: 'scorm_packages',
  underscored: true,
  indexes: [
    { fields: ['uploaded_by_id'] },
    { fields: ['scorm_version'] },
    { fields: ['is_active'] }
  ]
});

module.exports = SCORMPackage;
