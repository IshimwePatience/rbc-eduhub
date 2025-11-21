// Business logic for assignment management
const { Assignment } = require('../model/Assessments/Assignment');

exports.createAssignment = async (data) => Assignment.create(data);
exports.editAssignment = async (id, data) => Assignment.update(data, { where: { id } });
exports.deleteAssignment = async (id) => Assignment.destroy({ where: { id } });
exports.listCourseAssignments = async (courseId) => Assignment.findAll({ where: { courseId } });
