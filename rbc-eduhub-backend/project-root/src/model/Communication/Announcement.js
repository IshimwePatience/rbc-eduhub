const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Announcement = sequelize.define('Announcement', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'author_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  targetAudience: {
    type: DataTypes.ENUM('all-users','course-specific','role-specific','organization-specific','custom'),
    allowNull: false,
    field: 'target_audience'
  },
  targetCourses: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'target_courses' },
  targetRoles: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'target_roles' },
  targetOrganizations: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [], field: 'target_organizations' },
  targetUsers: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'target_users' },
  priority: { type: DataTypes.ENUM('low','normal','high','urgent'), defaultValue: 'normal' },
  category: { type: DataTypes.ENUM('general','academic','technical','emergency','maintenance'), defaultValue: 'general' },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_published' },
  publishedAt: { type: DataTypes.DATE, field: 'published_at' },
  expiresAt: { type: DataTypes.DATE, field: 'expires_at' },
  isPinned: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_pinned' },
  attachments: { type: DataTypes.JSONB, defaultValue: [] },
  sendEmail: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'send_email' },
  sendSMS: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'send_sms' },
  sendPushNotification: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'send_push_notification' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  viewedBy: { type: DataTypes.JSONB, defaultValue: [], field: 'viewed_by' }
}, {
  timestamps: true,
  tableName: 'announcements',
  underscored: true,
  indexes: [
    { fields: ['author_id'] },
    { fields: ['target_audience'] },
    { fields: ['is_published'] },
    { fields: ['published_at'] },
    { fields: ['priority'] },
    { fields: ['is_pinned'] }
  ]
});

module.exports = Announcement;
