const { ExamProctoringLog } = require('../model/Assessments/ExamProctoringLog');

// Log a proctoring event
exports.logEvent = async (req, res) => {
  try {
    const { examId, userId, eventType, details } = req.body;
    const log = await ExamProctoringLog.create({
      examId,
      userId,
      eventType,
      details,
      timestamp: new Date()
    });
    res.status(201).json({ success: true, log });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all proctoring logs for an exam
exports.getLogs = async (req, res) => {
  try {
    const { examId } = req.params;
    const logs = await ExamProctoringLog.findAll({ where: { examId } });
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
