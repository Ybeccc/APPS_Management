const CourseRepository = require('../../domain/repositories/CourseRepository');
const Courses = require('../../domain/entities/Courses');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Classes
const CoursesModel = sequelizeDatabase.getConnection().define('Course', {
    crsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'crs_id'  // Maps to snake_case in the database
    },
    crsCourseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'crs_course_name'
    },
    crsCode: {
        type: DataTypes.STRING(7),
        allowNull: false,
        field: 'crs_code'
    },
    crsCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'crs_created_at'
    }
}, {
  tableName: 'course',
  schema: 'users',
  timestamps: false,
});

class SequelizeCoursesRepository extends CourseRepository {
  async create(coursesData) {
    const createdCourses = await CoursesModel.create(coursesData);
    return createdCourses;
  }
  async getAll() {
    return await CoursesModel.findAll();
  }
  async getListAssistantByCourse(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_assistant_by_course(:roleId)', // Call the stored function
        {
          replacements: { roleId }, 
          type: sequelize.QueryTypes.SELECT
        }
      );
      return Array.isArray(results) ? results : results ? [results] : [];
    } catch (error) {
      console.error('Error calling stored function:', error);
      throw error;
    }
  }
}

module.exports = SequelizeCoursesRepository;