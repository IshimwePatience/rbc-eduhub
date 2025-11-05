const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Audio = sequelize.define('Audio', {
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
    allowNull: false,
    field: 'file_size'
  },
  mimeType: {
    type: DataTypes.ENUM('audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'),
    allowNull: false,
    field: 'mime_type'
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transcript: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cdn: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      enabled: false
    }
  },
  plays: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'audios',
  underscored: true,
  indexes: [
    { fields: ['uploaded_by_id'] },
    { fields: ['is_active'] }
  ]
});

module.exports = Audio;
