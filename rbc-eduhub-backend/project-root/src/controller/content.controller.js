// Controller for course content creation and video editing
const { CourseContent } = require('../model/Course Structure/CourseContent');

// Add content (text, file, video, etc.)
exports.addContent = async (req, res) => {
  try {
    const content = await CourseContent.create(req.body);
    res.status(201).json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add YouTube video by link
exports.addYouTubeVideo = async (req, res) => {
  try {
    const { courseId, title, youtubeUrl } = req.body;
    const content = await CourseContent.create({
      courseId,
      title,
      type: 'youtube',
      url: youtubeUrl
    });
    res.status(201).json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Cut video (basic implementation, stores cut timestamps)
exports.cutVideo = async (req, res) => {
  try {
    const { contentId, startTime, endTime } = req.body;
    // Store cut info in content metadata
    const content = await CourseContent.findByPk(contentId);
    if (!content) return res.status(404).json({ success: false, error: 'Content not found' });
    content.metadata = { ...content.metadata, cut: { startTime, endTime } };
    await content.save();
    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
