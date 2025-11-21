// Business logic for course content management
const { CourseContent } = require('../model/Course Structure/CourseContent');

exports.addContent = async (data) => CourseContent.create(data);
exports.addYouTubeVideo = async (courseId, title, youtubeUrl) => CourseContent.create({ courseId, title, type: 'youtube', url: youtubeUrl });
exports.cutVideo = async (contentId, startTime, endTime) => {
  const content = await CourseContent.findByPk(contentId);
  if (!content) throw new Error('Content not found');
  content.metadata = { ...content.metadata, cut: { startTime, endTime } };
  await content.save();
  return content;
};
