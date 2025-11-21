const { Course } = require('../model/Course Structure/Course');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Edit a course
exports.editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Course.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, error: 'Course not found' });
    const course = await Course.findByPk(id);
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, error: 'Course not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// List instructor's courses
exports.listInstructorCourses = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const courses = await Course.findAll({ where: { instructorId } });
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
