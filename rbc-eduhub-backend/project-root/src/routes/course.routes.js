const express = require('express');
const router = express.Router();
const courseController = require('../controller/course.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, courseController.createCourse);
router.put('/:id', authenticateJWT, courseController.editCourse);
router.delete('/:id', authenticateJWT, courseController.deleteCourse);
router.get('/instructor/:instructorId', authenticateJWT, courseController.listInstructorCourses);

module.exports = router;
