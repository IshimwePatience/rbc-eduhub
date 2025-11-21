// Live session controller for instructor live session scheduling
const { LiveSession } = require('../model/Live Sessions/LiveSession');

exports.createLiveSession = async (req, res) => {
  try {
    const session = await LiveSession.create(req.body);
    res.status(201).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.editLiveSession = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await LiveSession.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, error: 'Live session not found' });
    const session = await LiveSession.findByPk(id);
    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteLiveSession = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LiveSession.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, error: 'Live session not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listCourseLiveSessions = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sessions = await LiveSession.findAll({ where: { courseId } });
    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
