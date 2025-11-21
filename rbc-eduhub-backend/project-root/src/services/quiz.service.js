// Business logic for quiz management
const { Quiz } = require('../model/Assessments/Quiz');

exports.createQuiz = async (data) => Quiz.create(data);
exports.editQuiz = async (id, data) => Quiz.update(data, { where: { id } });
exports.deleteQuiz = async (id) => Quiz.destroy({ where: { id } });
exports.listCourseQuizzes = async (courseId) => Quiz.findAll({ where: { courseId } });
