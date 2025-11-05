const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const RatingReport = sequelize.define('RatingReport', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  ratingType: { type: DataTypes.ENUM('course','instructor','content'), allowNull: false, field: 'rating_type' },
  ratingId: { type: DataTypes.UUID, allowNull: false, field: 'rating_id' },
  ratingModel: { type: DataTypes.ENUM('CourseRating','InstructorRating','ContentRating'), allowNull: false, field: 'rating_model' },
  reportedById: { type: DataTypes.UUID, allowNull: false, field: 'reported_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  reason: { type: DataTypes.ENUM('spam','offensive-language','inappropriate-content','false-information','harassment','off-topic','duplicate','other'), allowNull: false },
  description: { type: DataTypes.STRING(500) },
  status: { type: DataTypes.ENUM('pending','under-review','resolved','dismissed'), defaultValue: 'pending' },
  reviewedById: { type: DataTypes.UUID, allowNull: true, field: 'reviewed_by_id', references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
  reviewedAt: { type: DataTypes.DATE, field: 'reviewed_at' },
  action: { type: DataTypes.ENUM('none','warning','rating-removed','user-suspended','rating-edited') },
  actionNote: { type: DataTypes.STRING, field: 'action_note' },
  resolution: { type: DataTypes.STRING }
}, {
  timestamps: true,
  tableName: 'rating_reports',
  underscored: true,
  indexes: [
    { fields: ['rating_id', 'reported_by_id'] },
    { fields: ['status'] },
    { fields: ['rating_type'] },
    { fields: ['reported_by_id'] },
    { fields: ['created_at'] }
  ]
});

module.exports = RatingReport;
