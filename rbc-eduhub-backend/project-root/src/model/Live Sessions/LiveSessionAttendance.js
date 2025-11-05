const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const LiveSessionAttendance = sequelize.define('LiveSessionAttendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'session_id',
    references: {
      model: 'live_sessions',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  learnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'learner_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  status: {
    type: DataTypes.ENUM('registered', 'attended', 'absent', 'partially-attended'),
    defaultValue: 'registered'
  },
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'joined_at'
  },
  leftAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'left_at'
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  attendancePercentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'attendance_percentage'
  },
  isPresent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_present'
  },
  joinedTimes: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
    field: 'joined_times'
  },
  deviceInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    field: 'device_info'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'live_session_attendances',
  underscored: true,
  indexes: [
    { fields: ['session_id', 'learner_id'], unique: true },
    { fields: ['learner_id', 'status'] },
    { fields: ['session_id', 'status'] }
  ]
});

module.exports = LiveSessionAttendance;
