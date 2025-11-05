const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Certificate = sequelize.define('Certificate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  certificateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'certificate_number'
  },
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'learner_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: { model: 'courses', key: 'id' },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    constraints: false
  },
  enrollmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'enrollment_id',
    references: { model: 'course_enrollments', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: false
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  issuedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'issued_date'
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'expiry_date'
  },
  isLifetime: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_lifetime'
  },
  certificateType: {
    type: DataTypes.ENUM('completion', 'achievement', 'participation', 'excellence'),
    defaultValue: 'completion',
    field: 'certificate_type'
  },
  score: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  grade: { type: DataTypes.STRING, allowNull: true },
  pdfUrl: { type: DataTypes.STRING, allowNull: true, field: 'pdf_url' },
  qrCode: { type: DataTypes.STRING, allowNull: true, field: 'qr_code' },
  verificationUrl: { type: DataTypes.STRING, allowNull: true, field: 'verification_url' },
  verificationCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    field: 'verification_code'
  },
  template: { type: DataTypes.STRING, allowNull: true },
  customFields: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'custom_fields'
  },
  issuedById: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'issued_by_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  signatories: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_revoked'
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'revoked_at'
  },
  revokedById: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'revoked_by_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  revokeReason: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'revoke_reason'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_public'
  },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  downloads: { type: DataTypes.INTEGER, defaultValue: 0 },
  shareUrl: { type: DataTypes.STRING, allowNull: true, field: 'share_url' },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'certificates',
  underscored: true,
  indexes: [
    { fields: ['certificate_number'], unique: true },
    { fields: ['learner_id'] },
    { fields: ['course_id'] },
    { fields: ['verification_code'], unique: true },
    { fields: ['is_revoked'] },
    { fields: ['issued_date'] }
  ]
});

Certificate.prototype.toPublic = function() {
  return {
    certificateNumber: this.certificateNumber,
    title: this.title,
    description: this.description,
    issuedDate: this.issuedDate,
    expiryDate: this.expiryDate,
    isLifetime: this.isLifetime,
    certificateType: this.certificateType,
    score: this.score,
    grade: this.grade,
    pdfUrl: this.pdfUrl,
    qrCode: this.qrCode,
    verificationUrl: this.verificationUrl,
    verificationCode: this.verificationCode,
    isRevoked: this.isRevoked,
    revokedAt: this.revokedAt,
  };
};

module.exports = Certificate;