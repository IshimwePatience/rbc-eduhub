const express = require('express');
const router = express.Router();
const liveSessionController = require('../controller/liveSession.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, liveSessionController.createLiveSession);
router.put('/:id', authenticateJWT, liveSessionController.editLiveSession);
router.delete('/:id', authenticateJWT, liveSessionController.deleteLiveSession);
router.get('/course/:courseId', authenticateJWT, liveSessionController.listCourseLiveSessions);

module.exports = router;
