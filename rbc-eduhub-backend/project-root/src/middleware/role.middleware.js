const { Role, User } = require('../model');

function requireRole(allowed = []) {
  // allowed: array of role names, or 'system' to allow isSystemRole
  return async function (req, res, next) {
    try {
      if (!req.auth || !req.auth.sub) return res.status(401).json({ success: false, message: 'Unauthorized' });
      const roleId = req.auth.roleId;
      if (!roleId) return res.status(403).json({ success: false, message: 'Forbidden' });
      const role = await Role.findByPk(roleId);
      if (!role) return res.status(403).json({ success: false, message: 'Forbidden' });
      if (allowed.includes('system') && role.isSystemRole) return next();
      if (allowed.length === 0) return next();
      if (allowed.includes(role.name)) return next();
      return res.status(403).json({ success: false, message: 'Forbidden' });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message || 'Role check failed' });
    }
  };
}

module.exports = { requireRole };
