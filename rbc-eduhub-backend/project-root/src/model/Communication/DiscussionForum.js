const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const DiscussionForum = sequelize.define('DiscussionForum', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  moduleId: { type: DataTypes.UUID, allowNull: true, field: 'module_id', references: { model: 'course_modules', key: 'id' }, onDelete: 'SET NULL' },
  createdById: { type: DataTypes.UUID, allowNull: false, field: 'created_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  forumType: { type: DataTypes.ENUM('general','qa','assignment','project','social'), defaultValue: 'general', field: 'forum_type' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  isLocked: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_locked' },
  isPinned: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_pinned' },
  allowAnonymous: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'allow_anonymous' },
  moderators: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
  postCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'post_count' },
  lastPostId: { type: DataTypes.UUID, allowNull: true, field: 'last_post_id', references: { model: 'discussion_posts', key: 'id' }, onDelete: 'SET NULL' },
  lastPostAt: { type: DataTypes.DATE, field: 'last_post_at' },
  settings: { type: DataTypes.JSONB, defaultValue: { requireApproval: false, allowAttachments: true, maxAttachmentSize: 5242880 } }
}, {
  timestamps: true,
  tableName: 'discussion_forums',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['module_id'] },
    { fields: ['is_active'] },
    { fields: ['is_pinned'] },
    { fields: ['last_post_at'] }
  ]
});

module.exports = DiscussionForum;
