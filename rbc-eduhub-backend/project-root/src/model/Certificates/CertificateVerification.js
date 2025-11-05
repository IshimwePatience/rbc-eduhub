const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const CertificateVerification = sequelize.define('CertificateVerification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  certificateId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'certificate_id',
    references: {
      model: 'certificates',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'verification_code'
  },
  verifiedBy: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  verificationMethod: {
    type: DataTypes.ENUM('qr-code', 'verification-code', 'url', 'manual'),
    allowNull: false,
    field: 'verification_method'
  },
  verifiedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'verified_at'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_agent'
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  status: {
    type: DataTypes.ENUM('valid', 'invalid', 'revoked', 'expired'),
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'certificate_verifications',
  underscored: true,
  indexes: [
    { fields: ['certificate_id'] },
    { fields: ['verification_code'] },
    { fields: ['verified_at'] },
    { fields: ['status'] }
  ]
});

module.exports = CertificateVerification;
