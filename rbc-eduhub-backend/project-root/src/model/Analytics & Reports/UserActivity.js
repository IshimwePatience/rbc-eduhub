const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const UserActivity = sequelize.define('UserActivity', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  activityType: {
    type: DataTypes.ENUM(
      'login','logout','course-view','course-enroll','content-view','content-complete','quiz-attempt','assignment-submit','exam-attempt','forum-post','forum-reply','certificate-download','live-session-join','profile-update','search','other'
    ),
    allowNull: false,
    field: 'activity_type'
  },
  activityDetails: { type: DataTypes.JSONB, defaultValue: {}, field: 'activity_details' },
  relatedObject: { type: DataTypes.JSONB, defaultValue: {}, field: 'related_object' },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'session_id',
    references: { model: 'sessions', key: 'id' },
    onDelete: 'SET NULL'
  },
  deviceInfo: { type: DataTypes.JSONB, defaultValue: {}, field: 'device_info' },
  ipAddress: { type: DataTypes.STRING, field: 'ip_address' },
  location: { type: DataTypes.JSONB, defaultValue: {} },
  duration: { type: DataTypes.INTEGER },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: true,
  tableName: 'user_activities',
  underscored: true,
  indexes: [
    { fields: ['user_id', 'timestamp'] },
    { fields: ['activity_type'] },
    { fields: ['timestamp'] }
  ]
});

module.exports = UserActivity;
