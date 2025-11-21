const express = require('express');
const router = express.Router();
const contentController = require('../controller/content.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, contentController.addContent);
router.post('/youtube', authenticateJWT, contentController.addYouTubeVideo);
router.post('/cut', authenticateJWT, contentController.cutVideo);

module.exports = router;
