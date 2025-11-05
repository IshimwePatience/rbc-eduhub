const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ContentRating = sequelize.define('ContentRating', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  contentId: { type: DataTypes.UUID, allowNull: false, field: 'content_id', references: { model: 'course_contents', key: 'id' }, onDelete: 'CASCADE' },
  learnerId: { type: DataTypes.UUID, allowNull: false, field: 'learner_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
  contentType: { type: DataTypes.ENUM('video','document','audio','scorm','quiz','assignment','text'), allowNull: false, field: 'content_type' },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  review: { type: DataTypes.STRING(500) },
  aspects: { type: DataTypes.JSONB, defaultValue: {} },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_published' },
  helpfulCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'helpful_count' },
  helpfulBy: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'helpful_by' },
  reportCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'report_count' },
  isReported: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_reported' },
  moderationStatus: { type: DataTypes.ENUM('pending','approved','rejected','flagged'), defaultValue: 'approved', field: 'moderation_status' },
  moderatedById: { type: DataTypes.UUID, allowNull: true, field: 'moderated_by_id', references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
  moderatedAt: { type: DataTypes.DATE, field: 'moderated_at' }
}, {
  timestamps: true,
  tableName: 'content_ratings',
  underscored: true,
  indexes: [
    { fields: ['content_id', 'learner_id'], unique: true },
    { fields: ['content_id', 'rating'] },
    { fields: ['learner_id'] },
    { fields: ['course_id'] },
    { fields: ['content_type'] },
    { fields: ['is_published'] }
  ]
});

module.exports = ContentRating;
