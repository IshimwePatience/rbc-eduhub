# Remaining Model Conversions - Quick Reference

## Progress: 38/61 models converted (62%)

## Remaining: 23 models across 6 folders

### Conversion Pattern Summary
All models follow this pattern:
1. Replace `const mongoose = require('mongoose');` with Sequelize imports
2. Convert ObjectId refs to UUID foreign keys
3. Convert nested objects to JSONB
4. Convert arrays to ARRAY(DataTypes.X) or JSONB
5. Use DataTypes.ENUM() for enum fields
6. Define indexes array
7. Use snake_case table names

---

## FOLDERS TO CONVERT:

### 1. Communication (6 models)
- EmailNotification.js
- SMSNotification.js  
- Announcement.js
- DiscussionForum.js
- DiscussionPost.js
- DiscussionReply.js

### 2. Analytics & Reports (4 models)
- UserActivity.js
- CourseAnalytics.js
- SystemUsageStats.js
- Report.js

### 3. Integrations (3 models)
- ExternalContentProvider.js
- MoHIntegration.js
- WhatsAppIntegration.js

### 4. System Config (3 models)
- SystemSettings.js
- CDNConfiguration.js
- BulkUserImport.js

### 5. Rating (4 models)
- CourseRating.js
- InstructorRating.js
- ContentRating.js
- RatingReport.js

### 6. Payment (4 models) - ALREADY CREATED
- Payment.js ✓
- PaymentMethod.js ✓
- Invoice.js ✓
- Refund.js ✓

---

## Standard Conversion Template:

```javascript
// OLD (Mongoose)
const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

modelSchema.index({ user: 1 });
module.exports = mongoose.model('ModelName', modelSchema);

// NEW (Sequelize)
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ModelName = sequelize.define('ModelName', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'model_names',
  indexes: [
    { fields: ['userId'] }
  ]
});

module.exports = ModelName;
```

---

## Key Reference Mapping:

### Table Names (Mongoose → Sequelize):
- User → users
- Course → courses
- CourseModule → course_modules
- CourseContent → course_contents
- CourseEnrollment → course_enrollments
- Quiz → quizzes
- Question → questions
- Assignment → assignments
- Certificate → certificates

### Data Type Mapping:
- String → DataTypes.STRING or DataTypes.TEXT
- Number → DataTypes.INTEGER or DataTypes.DECIMAL(10,2)
- Boolean → DataTypes.BOOLEAN
- Date → DataTypes.DATE or DataTypes.DATEONLY
- ObjectId → DataTypes.UUID (with references)
- Mixed → DataTypes.JSONB
- [String] → DataTypes.ARRAY(DataTypes.STRING)
- [ObjectId] → DataTypes.ARRAY(DataTypes.UUID)
- [{...}] → DataTypes.JSONB

### Common Patterns:
- `default: Date.now` → `defaultValue: DataTypes.NOW`
- `select: false` → Remove (handle in queries)
- `trim: true` → Remove (handle in hooks)
- `lowercase: true` → Use setter: `set(value) { this.setDataValue('field', value.toLowerCase()); }`
- `min/max validators` → Use `validate: { min: X, max: Y }`

---

## COMPLETED FOLDERS (38 models):
✓ User & Auth (7)
✓ Course Structure (7)
✓ Content Types (5)
✓ Assessments (10)
✓ Live Sessions (3)
✓ Certificates (2)
✓ Progress Tracking (4)
