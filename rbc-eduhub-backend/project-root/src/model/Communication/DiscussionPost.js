const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const DiscussionPost = sequelize.define('DiscussionPost', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  forumId: { type: DataTypes.UUID, allowNull: false, field: 'forum_id', references: { model: 'discussion_forums', key: 'id' }, onDelete: 'CASCADE' },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false, field: 'author_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  isAnonymous: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_anonymous' },
  isPinned: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_pinned' },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_approved' },
  isFlagged: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_flagged' },
  flagReason: { type: DataTypes.STRING, field: 'flag_reason' },
  attachments: { type: DataTypes.JSONB, defaultValue: [] },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  replyCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'reply_count' },
  viewCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'view_count' },
  likeCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'like_count' },
  likedBy: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'liked_by' },
  lastReplyId: { type: DataTypes.UUID, allowNull: true, field: 'last_reply_id', references: { model: 'discussion_replies', key: 'id' }, onDelete: 'SET NULL' },
  lastReplyAt: { type: DataTypes.DATE, field: 'last_reply_at' },
  isSolved: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_solved' },
  solvedById: { type: DataTypes.UUID, allowNull: true, field: 'solved_by_id', references: { model: 'discussion_replies', key: 'id' }, onDelete: 'SET NULL' }
}, {
  timestamps: true,
  tableName: 'discussion_posts',
  underscored: true,
  indexes: [
    { fields: ['forum_id'] },
    { fields: ['author_id'] },
    { fields: ['is_pinned'] },
    { fields: ['is_approved'] },
    { fields: ['is_flagged'] },
    { fields: ['last_reply_at'] },
    { fields: ['tags'] }
  ]
});

module.exports = DiscussionPost;
