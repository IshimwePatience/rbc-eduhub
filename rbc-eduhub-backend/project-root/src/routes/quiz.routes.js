const express = require('express');
const router = express.Router();
const quizController = require('../controller/quiz.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, quizController.createQuiz);
router.put('/:id', authenticateJWT, quizController.editQuiz);
router.delete('/:id', authenticateJWT, quizController.deleteQuiz);
router.get('/course/:courseId', authenticateJWT, quizController.listCourseQuizzes);

module.exports = router;
