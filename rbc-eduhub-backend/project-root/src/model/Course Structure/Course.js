const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    set(value) {
      this.setDataValue('slug', value ? value.toLowerCase() : null);
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'short_description'
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'category_id',
    references: {
      model: 'course_categories',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'instructor_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  coInstructors: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: [],
    field: 'co_instructors'
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'cover_image'
  },
  previewVideo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'preview_video'
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner'
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'English'
  },
  duration: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  estimatedCompletionTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'estimated_completion_time'
  },
  prerequisites: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  learningObjectives: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    field: 'learning_objectives'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  isMandatory: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_mandatory'
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_published'
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'published_at'
  },
  enrollmentType: {
    type: DataTypes.ENUM('open', 'restricted', 'invitation-only'),
    defaultValue: 'open',
    field: 'enrollment_type'
  },
  enrollmentLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'enrollment_limit'
  },
  enrollmentStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'enrollment_start_date'
  },
  enrollmentEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'enrollment_end_date'
  },
  courseStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'course_start_date'
  },
  courseEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'course_end_date'
  },
  passingCriteria: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      minimumScore: 70,
      requireAllModules: true,
      requireExam: false
    },
    field: 'passing_criteria'
  },
  certificateTemplateId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'certificate_template_id',
    references: {
      model: 'certificates',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    constraints: false
  },
  price: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      amount: 0,
      currency: 'RWF'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  currentVersionId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'current_version_id',
    references: {
      model: 'course_versions',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    constraints: false
  },
  rating: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      average: 0,
      count: 0
    }
  },
  enrollmentCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'enrollment_count'
  },
  completionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'completion_count'
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      allowDiscussions: true,
      allowRatings: true,
      offlineAccessEnabled: false,
      dripContent: false
    }
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true,
  tableName: 'courses',
  underscored: true,
  indexes: [
    { fields: ['slug'], unique: true },
    { fields: ['category_id'] },
    { fields: ['instructor_id'] },
    { fields: ['is_published', 'is_active'] },
    { fields: ['tags'], using: 'gin' }
  ]
});

Course.prototype.toPublic = function() {
  return {
    title: this.title,
    slug: this.slug,
    shortDescription: this.shortDescription,
    thumbnail: this.thumbnail,
    coverImage: this.coverImage,
    level: this.level,
    language: this.language,
    isMandatory: this.isMandatory,
    isPublished: this.isPublished,
    publishedAt: this.publishedAt,
    price: this.price,
    rating: this.rating,
    enrollmentCount: this.enrollmentCount,
  };
};

module.exports = Course;