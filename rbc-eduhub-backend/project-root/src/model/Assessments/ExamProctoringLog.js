const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const ExamProctoringLog = sequelize.define('ExamProctoringLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  examId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'exams',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    field: 'exam_id'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    field: 'user_id'
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false // e.g. 'tab-switch', 'camera-off', 'face-away', 'warning', 'auto-submit'
  },
  details: {
    type: DataTypes.JSONB,
    allowNull: true // extra info (e.g. screenshot, reason, etc.)
  }
}, {
  timestamps: false,
  tableName: 'exam_proctoring_logs',
  underscored: true
});

module.exports = ExamProctoringLog;
