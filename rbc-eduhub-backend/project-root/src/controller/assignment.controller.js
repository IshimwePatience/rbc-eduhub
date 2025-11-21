// Assignment controller for instructor assignment management
const { Assignment } = require('../model/Assessments/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.editAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Assignment.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, error: 'Assignment not found' });
    const assignment = await Assignment.findByPk(id);
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Assignment.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, error: 'Assignment not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.findAll({ where: { courseId } });
    res.json({ success: true, assignments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
