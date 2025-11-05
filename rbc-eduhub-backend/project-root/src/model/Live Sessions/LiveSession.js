const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const LiveSession = sequelize.define('LiveSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'course_id',
    references: {
      model: 'courses',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'module_id',
    references: {
      model: 'course_modules',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'instructor_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  coHosts: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: [],
    field: 'co_hosts'
  },
  scheduledStartTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'scheduled_start_time'
  },
  scheduledEndTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'scheduled_end_time'
  },
  actualStartTime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'actual_start_time'
  },
  actualEndTime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'actual_end_time'
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  platform: {
    type: DataTypes.ENUM('jitsi', 'zoom', 'teams', 'webex'),
    defaultValue: 'jitsi'
  },
  meetingUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'meeting_url'
  },
  meetingId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'meeting_id'
  },
  meetingPassword: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'meeting_password'
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'room_name'
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    field: 'max_participants'
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'live', 'ended', 'cancelled'),
    defaultValue: 'scheduled'
  },
  isRecorded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_recorded'
  },
  recordingUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'recording_url'
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      enableChat: true,
      enableScreenShare: true,
      enableVideo: true,
      enableAudio: true,
      muteParticipantsOnEntry: false,
      waitingRoom: false
    }
  },
  attendanceRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'attendance_required'
  },
  minimumAttendanceDuration: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'minimum_attendance_duration'
  },
  isMandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_mandatory'
  },
  materials: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  agenda: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'live_sessions',
  underscored: true,
  indexes: [
    { fields: ['course_id'] },
    { fields: ['instructor_id'] },
    { fields: ['scheduled_start_time'] },
    { fields: ['status'] }
  ]
});

LiveSession.prototype.toPublic = function() {
  return {
    title: this.title,
    description: this.description,
    scheduledStartTime: this.scheduledStartTime,
    scheduledEndTime: this.scheduledEndTime,
    platform: this.platform,
    meetingUrl: this.meetingUrl,
    roomName: this.roomName,
    maxParticipants: this.maxParticipants,
    status: this.status,
    isRecorded: this.isRecorded,
    recordingUrl: this.recordingUrl,
  };
};

module.exports = LiveSession;
