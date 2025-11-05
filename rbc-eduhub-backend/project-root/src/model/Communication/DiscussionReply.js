const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const DiscussionReply = sequelize.define('DiscussionReply', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  postId: { type: DataTypes.UUID, allowNull: false, field: 'post_id', references: { model: 'discussion_posts', key: 'id' }, onDelete: 'CASCADE' },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorId: { type: DataTypes.UUID, allowNull: false, field: 'author_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  isAnonymous: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_anonymous' },
  parentReplyId: { type: DataTypes.UUID, allowNull: true, field: 'parent_reply_id', references: { model: 'discussion_replies', key: 'id' }, onDelete: 'SET NULL' },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_approved' },
  isFlagged: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_flagged' },
  flagReason: { type: DataTypes.STRING, field: 'flag_reason' },
  attachments: { type: DataTypes.JSONB, defaultValue: [] },
  likeCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'like_count' },
  likedBy: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'liked_by' },
  isAcceptedAnswer: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_accepted_answer' },
  acceptedById: { type: DataTypes.UUID, allowNull: true, field: 'accepted_by_id', references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
  acceptedAt: { type: DataTypes.DATE, field: 'accepted_at' }
}, {
  timestamps: true,
  tableName: 'discussion_replies',
  underscored: true,
  indexes: [
    { fields: ['post_id'] },
    { fields: ['author_id'] },
    { fields: ['parent_reply_id'] },
    { fields: ['is_approved'] },
    { fields: ['is_flagged'] },
    { fields: ['is_accepted_answer'] }
  ]
});

module.exports = DiscussionReply;
