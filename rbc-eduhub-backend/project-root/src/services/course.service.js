// Business logic for course management
const { Course } = require('../model/Course Structure/Course');

exports.createCourse = async (data) => Course.create(data);
exports.editCourse = async (id, data) => Course.update(data, { where: { id } });
exports.deleteCourse = async (id) => Course.destroy({ where: { id } });
exports.listInstructorCourses = async (instructorId) => Course.findAll({ where: { instructorId } });
