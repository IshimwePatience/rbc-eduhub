// Business logic for live session management
const { LiveSession } = require('../model/Live Sessions/LiveSession');

exports.createLiveSession = async (data) => LiveSession.create(data);
exports.editLiveSession = async (id, data) => LiveSession.update(data, { where: { id } });
exports.deleteLiveSession = async (id) => LiveSession.destroy({ where: { id } });
exports.listCourseLiveSessions = async (courseId) => LiveSession.findAll({ where: { courseId } });
