const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const OfflineContent = sequelize.define('OfflineContent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  contentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'content_id'
  },
  contentModel: {
    type: DataTypes.ENUM('Video', 'Document', 'Audio', 'SCORMPackage'),
    allowNull: false,
    field: 'content_model'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'course_id',
    references: {
      model: 'courses',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
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
  offlinePackageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'offline_package_url'
  },
  packageSize: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'package_size'
  },
  expirationDays: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
    field: 'expiration_days'
  },
  format: {
    type: DataTypes.ENUM('zip', 'encrypted'),
    defaultValue: 'zip'
  },
  encryption: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      enabled: false
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'generated_at'
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'last_updated'
  },
  downloads: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'offline_contents',
  underscored: true,
  indexes: [
    { fields: ['content_id', 'content_model'] },
    { fields: ['course_id'] },
    { fields: ['is_active'] }
  ]
});

module.exports = OfflineContent;
