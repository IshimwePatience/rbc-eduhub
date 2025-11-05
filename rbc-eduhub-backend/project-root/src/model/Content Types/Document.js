const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Document = sequelize.define('Document', {
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
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'file_url'
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'file_name'
  },
  fileSize: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'mime_type'
  },
  pageCount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preview: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      enabled: true
    }
  },
  downloadable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  downloads: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cdn: {
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
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'documents',
  underscored: true,
  indexes: [
    { fields: ['uploaded_by_id'] },
    { fields: ['is_active'] },
    { fields: ['mime_type'] }
  ]
});

module.exports = Document;
