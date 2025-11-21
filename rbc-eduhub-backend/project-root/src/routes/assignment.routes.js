const express = require('express');
const router = express.Router();
const assignmentController = require('../controller/assignment.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, assignmentController.createAssignment);
router.put('/:id', authenticateJWT, assignmentController.editAssignment);
router.delete('/:id', authenticateJWT, assignmentController.deleteAssignment);
router.get('/course/:courseId', authenticateJWT, assignmentController.listCourseAssignments);

module.exports = router;
