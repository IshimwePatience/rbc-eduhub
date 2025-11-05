const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const LiveSessionRecording = sequelize.define('LiveSessionRecording', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'session_id',
    references: {
      model: 'live_sessions',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recordingUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'recording_url'
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'file_name'
  },
  fileSize: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: 'file_size'
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  format: {
    type: DataTypes.ENUM('mp4', 'webm', 'mov'),
    defaultValue: 'mp4'
  },
  quality: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'hd'),
    defaultValue: 'medium'
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'started_at'
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'ended_at'
  },
  status: {
    type: DataTypes.ENUM('processing', 'available', 'failed', 'deleted'),
    defaultValue: 'processing'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_public'
  },
  accessibleTo: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: [],
    field: 'accessible_to'
  },
  downloadable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  downloads: {
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
  transcription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  chapters: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  uploadedById: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'uploaded_by_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
}, {
  timestamps: true,
  tableName: 'live_session_recordings',
  underscored: true,
  indexes: [
    { fields: ['session_id'] },
    { fields: ['status'] },
    { fields: ['is_public'] }
  ]
});

module.exports = LiveSessionRecording;
