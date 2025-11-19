// Centralized model loader and associations
// Loads all models and defines Sequelize associations

// User & Auth
const User = require('./User & Auth/User');
const Role = require('./User & Auth/Role');
const Session = require('./User & Auth/Session');
const RefreshToken = require('./User & Auth/RefreshToken');
const PasswordReset = require('./User & Auth/PasswordReset');
const MFAToken = require('./User & Auth/MFAToken');
const UserProfile = require('./User & Auth/UserProfile');
const SocialAuth = require('./User & Auth/SocialAuth');

// Course Structure
const Course = require('./Course Structure/Course');
const CourseCategory = require('./Course Structure/CourseCategory');
const CourseModule = require('./Course Structure/CourseModule');
const CourseContent = require('./Course Structure/CourseContent');
const CourseVersion = require('./Course Structure/CourseVersion');
const CourseEnrollment = require('./Course Structure/CourseEnrollment');
const CourseMandatoryAssignment = require('./Course Structure/CourseMandatoryAssignment');

// Content Types
const Video = require('./Content Types/Video');
const Document = require('./Content Types/Document');
const Audio = require('./Content Types/Audio');
const SCORMPackage = require('./Content Types/SCORMPackage');
const OfflineContent = require('./Content Types/OfflineContent');

// Assessments
const PreAssessment = require('./Assessments/PreAssessment');
const Quiz = require('./Assessments/Quiz');
const Question = require('./Assessments/Question');
const QuestionOption = require('./Assessments/QuestionOption');
const QuizAttempt = require('./Assessments/QuizAttempt');
const QuizAnswer = require('./Assessments/QuizAnswer');
const Assignment = require('./Assessments/Assignment');
const AssignmentSubmission = require('./Assessments/AssignmentSubmission');
const Exam = require('./Assessments/Exam');
const ExamAttempt = require('./Assessments/ExamAttempt');

// Live Sessions
const LiveSession = require('./Live Sessions/LiveSession');
const LiveSessionAttendance = require('./Live Sessions/LiveSessionAttendance');
const LiveSessionRecording = require('./Live Sessions/LiveSessionRecording');

// Certificates
const Certificate = require('./Certificates/Certificate');
const CertificateVerification = require('./Certificates/CertificateVerification');

// Progress Tracking
const LearnerProgress = require('./Progress Tracking/LearnerProgress');
const ModuleCompletion = require('./Progress Tracking/ModuleCompletion');
const ContentCompletion = require('./Progress Tracking/ContentCompletion');
const xAPIStatement = require('./Progress Tracking/xAPIStatement');

// Communication
const EmailNotification = require('./Communication/EmailNotification');
const EmailVerification = require('./Communication/EmailVerification');
const SMSNotification = require('./Communication/SMSNotification');
const Announcement = require('./Communication/Announcement');
const DiscussionForum = require('./Communication/DiscussionForum');
const DiscussionPost = require('./Communication/DiscussionPost');
const DiscussionReply = require('./Communication/DiscussionReply');

// Analytics & Reports
const UserActivity = require('./Analytics & Reports/UserActivity');
const CourseAnalytics = require('./Analytics & Reports/CourseAnalytics');
const SystemUsageStats = require('./Analytics & Reports/SystemUsageStats');
const Report = require('./Analytics & Reports/Report');

// Integrations
const ExternalContentProvider = require('./Integrations/ExternalContentProvider');
const MoHIntegration = require('./Integrations/MoHIntegration');
const WhatsAppIntegration = require('./Integrations/WhatsAppIntegration');

// Payment
const Payment = require('./Payment/Payment');
const Invoice = require('./Payment/Invoice');
const PaymentMethod = require('./Payment/PaymentMethod');
const Refund = require('./Payment/Refund');

// Rating
const ContentRating = require('./Rating/ContentRating');
const CourseRating = require('./Rating/CourseRating');
const InstructorRating = require('./Rating/InstructorRating');
const RatingReport = require('./Rating/RatingReport');

// System Config
const SystemSettings = require('./System Config/SystemSettings');
const CDNConfiguration = require('./System Config/CDNConfiguration');
const BulkUserImport = require('./System Config/BulkUserImport');

// ---------------- Associations ----------------

// Roles & Users
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// User sessions & security
User.hasMany(Session, { foreignKey: 'userId' });
Session.belongsTo(User, { foreignKey: 'userId' });

// Refresh tokens (long-lived sessions)
User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

PasswordReset.belongsTo(User, { foreignKey: 'userId' });
MFAToken.belongsTo(User, { foreignKey: 'userId' });
SocialAuth.belongsTo(User, { foreignKey: 'userId' });

// Course structure
CourseCategory.hasMany(Course, { foreignKey: 'categoryId' });
Course.belongsTo(CourseCategory, { foreignKey: 'categoryId' });

Course.hasMany(CourseModule, { foreignKey: 'courseId' });
CourseModule.belongsTo(Course, { foreignKey: 'courseId' });

Course.hasMany(CourseContent, { foreignKey: 'courseId' });
CourseContent.belongsTo(Course, { foreignKey: 'courseId' });

CourseModule.hasMany(CourseContent, { foreignKey: 'moduleId' });
CourseContent.belongsTo(CourseModule, { foreignKey: 'moduleId' });

Course.hasMany(CourseVersion, { foreignKey: 'courseId', constraints: false });
CourseVersion.belongsTo(Course, { foreignKey: 'courseId', constraints: false });

User.hasMany(CourseEnrollment, { foreignKey: 'learnerId' });
CourseEnrollment.belongsTo(User, { foreignKey: 'learnerId' });
Course.hasMany(CourseEnrollment, { foreignKey: 'courseId' });
CourseEnrollment.belongsTo(Course, { foreignKey: 'courseId' });

CourseMandatoryAssignment.belongsTo(Course, { foreignKey: 'courseId' });

// Content types -> course/module (if present)
[Video, Document, Audio, SCORMPackage, OfflineContent].forEach(Model => {
  if (Model?.rawAttributes?.courseId) Model.belongsTo(Course, { foreignKey: 'courseId' });
  if (Model?.rawAttributes?.moduleId) Model.belongsTo(CourseModule, { foreignKey: 'moduleId' });
});

// Assessments
Quiz.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Quiz, { foreignKey: 'courseId' });

Question.belongsTo(Quiz, { foreignKey: 'quizId' });
Quiz.hasMany(Question, { foreignKey: 'quizId' });

QuestionOption.belongsTo(Question, { foreignKey: 'questionId' });
Question.hasMany(QuestionOption, { foreignKey: 'questionId' });

QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId' });
Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId' });

QuizAttempt.belongsTo(User, { foreignKey: 'learnerId' });
User.hasMany(QuizAttempt, { foreignKey: 'learnerId' });

QuizAnswer.belongsTo(QuizAttempt, { foreignKey: 'attemptId' });
QuizAttempt.hasMany(QuizAnswer, { foreignKey: 'attemptId' });

QuizAnswer.belongsTo(Question, { foreignKey: 'questionId' });

Assignment.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Assignment, { foreignKey: 'courseId' });

AssignmentSubmission.belongsTo(Assignment, { foreignKey: 'assignmentId' });
Assignment.hasMany(AssignmentSubmission, { foreignKey: 'assignmentId' });

AssignmentSubmission.belongsTo(User, { foreignKey: 'learnerId' });

Exam.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Exam, { foreignKey: 'courseId' });

ExamAttempt.belongsTo(Exam, { foreignKey: 'examId' });
Exam.hasMany(ExamAttempt, { foreignKey: 'examId' });

ExamAttempt.belongsTo(User, { foreignKey: 'learnerId' });

PreAssessment.belongsTo(Course, { foreignKey: 'courseId', constraints: false });

// Live sessions
LiveSession.belongsTo(Course, { foreignKey: 'courseId' });
LiveSession.belongsTo(CourseModule, { foreignKey: 'moduleId' });
LiveSession.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

LiveSessionAttendance.belongsTo(LiveSession, { foreignKey: 'sessionId' });
LiveSession.hasMany(LiveSessionAttendance, { foreignKey: 'sessionId' });
LiveSessionAttendance.belongsTo(User, { foreignKey: 'learnerId' });

LiveSessionRecording.belongsTo(LiveSession, { foreignKey: 'sessionId' });
LiveSessionRecording.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploadedBy', constraints: false });

// Certificates
Certificate.belongsTo(User, { foreignKey: 'learnerId', as: 'learner' });
Certificate.belongsTo(Course, { foreignKey: 'courseId' });
Certificate.belongsTo(CourseEnrollment, { foreignKey: 'enrollmentId' });
Certificate.belongsTo(User, { foreignKey: 'issuedById', as: 'issuedBy', constraints: false });
Certificate.belongsTo(User, { foreignKey: 'revokedById', as: 'revokedBy', constraints: false });

CertificateVerification.belongsTo(Certificate, { foreignKey: 'certificateId' });

// Progress tracking
ContentCompletion.belongsTo(User, { foreignKey: 'learnerId' });
ContentCompletion.belongsTo(Course, { foreignKey: 'courseId' });
ContentCompletion.belongsTo(CourseModule, { foreignKey: 'moduleId' });
ContentCompletion.belongsTo(CourseContent, { foreignKey: 'contentId' });

ModuleCompletion.belongsTo(User, { foreignKey: 'learnerId' });
ModuleCompletion.belongsTo(Course, { foreignKey: 'courseId' });
ModuleCompletion.belongsTo(CourseModule, { foreignKey: 'moduleId' });

LearnerProgress.belongsTo(User, { foreignKey: 'learnerId' });
LearnerProgress.belongsTo(Course, { foreignKey: 'courseId' });
LearnerProgress.belongsTo(CourseEnrollment, { foreignKey: 'enrollmentId' });
LearnerProgress.belongsTo(CourseContent, { foreignKey: 'lastAccessedContentId', as: 'lastAccessedContent', constraints: false });
LearnerProgress.belongsTo(CourseModule, { foreignKey: 'currentModuleId', as: 'currentModule', constraints: false });

// Communication
EmailNotification.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
SMSNotification.belongsTo(User, { foreignKey: 'recipientId', as: 'recipient' });
Announcement.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

DiscussionForum.belongsTo(Course, { foreignKey: 'courseId' });
DiscussionForum.belongsTo(CourseModule, { foreignKey: 'moduleId' });
DiscussionForum.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });

DiscussionPost.belongsTo(DiscussionForum, { foreignKey: 'forumId' });
DiscussionPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

DiscussionReply.belongsTo(DiscussionPost, { foreignKey: 'postId' });
DiscussionReply.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
DiscussionReply.belongsTo(DiscussionReply, { foreignKey: 'parentReplyId', as: 'parentReply', constraints: false });

// Analytics & Reports
UserActivity.belongsTo(User, { foreignKey: 'userId' });
UserActivity.belongsTo(Session, { foreignKey: 'sessionId', constraints: false });
CourseAnalytics.belongsTo(Course, { foreignKey: 'courseId' });
Report.belongsTo(User, { foreignKey: 'generatedById', as: 'generatedBy' });

// Integrations
ExternalContentProvider.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
MoHIntegration.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
WhatsAppIntegration.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });

// Payments
Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Course, { foreignKey: 'courseId' });
Payment.belongsTo(CourseEnrollment, { foreignKey: 'enrollmentId', constraints: false });

Invoice.belongsTo(Payment, { foreignKey: 'paymentId' });
Invoice.belongsTo(User, { foreignKey: 'userId' });
Invoice.belongsTo(Course, { foreignKey: 'courseId' });

Refund.belongsTo(Payment, { foreignKey: 'paymentId' });
Refund.belongsTo(User, { foreignKey: 'userId' });
Refund.belongsTo(Course, { foreignKey: 'courseId' });

PaymentMethod.belongsTo(User, { foreignKey: 'userId' });

// Ratings
ContentRating.belongsTo(User, { foreignKey: 'learnerId' });
ContentRating.belongsTo(Course, { foreignKey: 'courseId' });

CourseRating.belongsTo(User, { foreignKey: 'learnerId' });
CourseRating.belongsTo(Course, { foreignKey: 'courseId' });
CourseRating.belongsTo(CourseEnrollment, { foreignKey: 'enrollmentId' });

InstructorRating.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });
InstructorRating.belongsTo(User, { foreignKey: 'learnerId', as: 'learner' });
InstructorRating.belongsTo(Course, { foreignKey: 'courseId' });

RatingReport.belongsTo(User, { foreignKey: 'reportedById', as: 'reportedBy' });

// System Config
CDNConfiguration.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
BulkUserImport.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploadedBy' });

// Export all models
module.exports = {
  User,
  Role,
  Session,
  PasswordReset,
  MFAToken,
  UserProfile,
  SocialAuth,
  RefreshToken,
  Course,
  CourseCategory,
  CourseModule,
  CourseContent,
  CourseVersion,
  CourseEnrollment,
  CourseMandatoryAssignment,
  Video,
  Document,
  Audio,
  SCORMPackage,
  OfflineContent,
  PreAssessment,
  Quiz,
  Question,
  QuestionOption,
  QuizAttempt,
  QuizAnswer,
  Assignment,
  AssignmentSubmission,
  Exam,
  ExamAttempt,
  LiveSession,
  LiveSessionAttendance,
  LiveSessionRecording,
  Certificate,
  CertificateVerification,
  LearnerProgress,
  ModuleCompletion,
  ContentCompletion,
  xAPIStatement,
  EmailNotification,
  EmailVerification,
  SMSNotification,
  Announcement,
  DiscussionForum,
  DiscussionPost,
  DiscussionReply,
  UserActivity,
  CourseAnalytics,
  SystemUsageStats,
  Report,
  ExternalContentProvider,
  MoHIntegration,
  WhatsAppIntegration,
  Payment,
  Invoice,
  PaymentMethod,
  Refund,
  ContentRating,
  CourseRating,
  InstructorRating,
  RatingReport,
  SystemSettings,
  CDNConfiguration,
  BulkUserImport
};