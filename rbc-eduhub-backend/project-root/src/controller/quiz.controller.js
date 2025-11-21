// Quiz controller for instructor quiz management
const { Quiz } = require('../model/Assessments/Quiz');

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, quiz });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.editQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Quiz.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, error: 'Quiz not found' });
    const quiz = await Quiz.findByPk(id);
    res.json({ success: true, quiz });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Quiz.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, error: 'Quiz not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listCourseQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.findAll({ where: { courseId } });
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
