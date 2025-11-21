const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'  // ← ADD
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'  // ← ADD
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },
  phone: {
    type: DataTypes.STRING
  },
  nationalId: {
    type: DataTypes.STRING,
    field: 'national_id'  // ← ADD
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'role_id',  // ← ADD
    references: {
      model: 'roles',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  jobTitle: {
    type: DataTypes.STRING,
    field: 'job_title'  // ← ADD
  },
  organization: {
    type: DataTypes.STRING
  },
  resident: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'  // ← ADD
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'  // ← ADD
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: 'last_login'  // ← ADD
  },
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'failed_login_attempts'  // ← ADD
  },
  accountLockedUntil: {
    type: DataTypes.DATE,
    field: 'account_locked_until'  // ← ADD
  },
  mfaEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'mfa_enabled'  // ← ADD
  },
  mfaSecret: {
    type: DataTypes.STRING,
    field: 'mfa_secret'  // ← ADD
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {
      language: 'en',
      timezone: 'UTC',
      emailNotifications: true,
      smsNotifications: false,
      whatsappNotifications: false
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true, 
  indexes: [
    { fields: ['email'] },
    { fields: ['role_id'] },  
    { fields: ['is_active'] },  
    { fields: ['national_id'] }, 
    { fields: ['organization'] }
  ],
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

User.prototype.toPublic = function() {
  // Get role name if available
  let roleName = null;
  if (this.Role && this.Role.name) {
    roleName = this.Role.name;
  } else if (this.roleId && this.getRole) {
    // Try to fetch role if not loaded
    try {
      const role = this.getRole();
      if (role && role.name) roleName = role.name;
    } catch (e) {}
  }
  return {
    fullName: `${this.firstName} ${this.lastName}`,
    email: this.email,
    phone: this.phone || null,
    jobTitle: this.jobTitle || null,
    organization: this.organization || null,
    isActive: this.isActive,
    isVerified: this.isVerified,
    preferences: this.preferences,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    roleId: this.roleId,
    roleName: roleName,
  };
};

module.exports = User;