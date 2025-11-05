const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CourseRating = sequelize.define('CourseRating', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
  learnerId: { type: DataTypes.UUID, allowNull: false, field: 'learner_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  enrollmentId: { type: DataTypes.UUID, allowNull: false, field: 'enrollment_id', references: { model: 'course_enrollments', key: 'id' }, onDelete: 'CASCADE' },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  review: { type: DataTypes.STRING(1000) },
  aspects: { type: DataTypes.JSONB, defaultValue: {} },
  isAnonymous: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_anonymous' },
  isVerifiedPurchase: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_verified_purchase' },
  isPublished: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_published' },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_featured' },
  helpfulCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'helpful_count' },
  helpfulBy: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'helpful_by' },
  reportCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'report_count' },
  isReported: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_reported' },
  moderationStatus: { type: DataTypes.ENUM('pending','approved','rejected','flagged'), defaultValue: 'approved', field: 'moderation_status' },
  moderatedById: { type: DataTypes.UUID, allowNull: true, field: 'moderated_by_id', references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
  moderatedAt: { type: DataTypes.DATE, field: 'moderated_at' },
  moderationNote: { type: DataTypes.STRING, field: 'moderation_note' }
}, {
  timestamps: true,
  tableName: 'course_ratings',
  underscored: true,
  indexes: [
    { fields: ['course_id', 'learner_id'], unique: true },
    { fields: ['course_id', 'rating'] },
    { fields: ['learner_id'] },
    { fields: ['is_published'] },
    { fields: ['moderation_status'] }
  ]
});

module.exports = CourseRating;
