const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const BulkUserImport = sequelize.define('BulkUserImport', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  fileName: { type: DataTypes.STRING, allowNull: false, field: 'file_name' },
  fileUrl: { type: DataTypes.STRING, allowNull: false, field: 'file_url' },
  fileSize: { type: DataTypes.BIGINT, field: 'file_size' },
  fileType: { type: DataTypes.ENUM('csv','xlsx','json'), defaultValue: 'csv', field: 'file_type' },
  uploadedById: { type: DataTypes.UUID, allowNull: false, field: 'uploaded_by_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  status: { type: DataTypes.ENUM('pending','validating','processing','completed','failed','partially-completed'), defaultValue: 'pending' },
  totalRows: { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_rows' },
  processedRows: { type: DataTypes.INTEGER, defaultValue: 0, field: 'processed_rows' },
  successCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'success_count' },
  failureCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'failure_count' },
  duplicateCount: { type: DataTypes.INTEGER, defaultValue: 0, field: 'duplicate_count' },
  validationErrors: { type: DataTypes.JSONB, defaultValue: [], field: 'validation_errors' },
  importErrors: { type: DataTypes.JSONB, defaultValue: [], field: 'import_errors' },
  duplicates: { type: DataTypes.JSONB, defaultValue: [] },
  importedUsers: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [], field: 'imported_users' },
  mapping: { type: DataTypes.JSONB, defaultValue: {} },
  options: { type: DataTypes.JSONB, defaultValue: { updateExisting: false, skipDuplicates: true, sendWelcomeEmail: true, autoGeneratePassword: true, defaultRole: null, autoEnrollCourses: [] } },
  startedAt: { type: DataTypes.DATE, field: 'started_at' },
  completedAt: { type: DataTypes.DATE, field: 'completed_at' },
  processingTime: { type: DataTypes.INTEGER, field: 'processing_time' },
  errorLogUrl: { type: DataTypes.STRING, field: 'error_log_url' },
  successLogUrl: { type: DataTypes.STRING, field: 'success_log_url' },
  notes: { type: DataTypes.STRING }
}, {
  timestamps: true,
  tableName: 'bulk_user_imports',
  underscored: true,
  indexes: [
    { fields: ['uploaded_by_id'] },
    { fields: ['status'] },
    { fields: ['created_at'] }
  ]
});

module.exports = BulkUserImport;
