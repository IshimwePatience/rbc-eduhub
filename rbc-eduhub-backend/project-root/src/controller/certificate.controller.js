// Certificate controller for instructor certificate management
const { Certificate } = require('../model/Certificates/Certificate');

exports.createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json({ success: true, certificate });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.editCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Certificate.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
    const certificate = await Certificate.findByPk(id);
    res.json({ success: true, certificate });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Certificate.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, error: 'Certificate not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listCourseCertificates = async (req, res) => {
  try {
    const { courseId } = req.params;
    const certificates = await Certificate.findAll({ where: { courseId } });
    res.json({ success: true, certificates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
