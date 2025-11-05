const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.ENUM('Super Admin', 'Admin', 'Instructor', 'Learner', 'Data Analyst'),
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue('slug', value.toLowerCase());
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  permissions: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  isSystemRole: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_system_role'  // ← ADD THIS
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'  // ← ADD THIS
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: 'roles',
  underscored: true,  // ← ADD THIS (converts camelCase to snake_case)
  indexes: [
    { fields: ['name'] },
    { fields: ['slug'] },
    { fields: ['is_active'] }  // ← CHANGE THIS
  ]
});

Role.prototype.hasPermission = function(module, action) {
  const permission = this.permissions.find(p => p.module === module);
  if (!permission) return false;
  return permission.actions.includes(action) || permission.actions.includes('manage');
};

module.exports = Role;