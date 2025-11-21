const express = require('express');
const router = express.Router();
const certificateController = require('../controller/certificate.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/', authenticateJWT, certificateController.createCertificate);
router.put('/:id', authenticateJWT, certificateController.editCertificate);
router.delete('/:id', authenticateJWT, certificateController.deleteCertificate);
router.get('/course/:courseId', authenticateJWT, certificateController.listCourseCertificates);

module.exports = router;
