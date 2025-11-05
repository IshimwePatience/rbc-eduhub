const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Report = sequelize.define('Report', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  reportType: {
    type: DataTypes.ENUM(
      'user-activity','course-performance','enrollment','assessment','completion','certificate','attendance','engagement','revenue','system-usage','custom'
    ),
    allowNull: false,
    field: 'report_type'
  },
  generatedById: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'generated_by_id',
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  status: { type: DataTypes.ENUM('pending','processing','completed','failed'), defaultValue: 'pending' },
  format: { type: DataTypes.ENUM('pdf','excel','csv','json'), defaultValue: 'pdf' },
  filters: { type: DataTypes.JSONB, defaultValue: {} },
  data: { type: DataTypes.JSONB, defaultValue: {} },
  fileUrl: { type: DataTypes.STRING, field: 'file_url' },
  fileSize: { type: DataTypes.BIGINT, field: 'file_size' },
  generatedAt: { type: DataTypes.DATE, field: 'generated_at' },
  expiresAt: { type: DataTypes.DATE, field: 'expires_at' },
  isScheduled: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_scheduled' },
  schedule: { type: DataTypes.JSONB, defaultValue: {} },
  recipients: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
  emailOnComplete: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'email_on_complete' },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_public' },
  downloads: { type: DataTypes.INTEGER, defaultValue: 0 },
  errorMessage: { type: DataTypes.TEXT, field: 'error_message' }
}, {
  timestamps: true,
  tableName: 'reports',
  underscored: true,
  indexes: [
    { fields: ['generated_by_id'] },
    { fields: ['report_type'] },
    { fields: ['status'] },
    { fields: ['generated_at'] },
    { fields: ['is_scheduled'] }
  ]
});

module.exports = Report;
