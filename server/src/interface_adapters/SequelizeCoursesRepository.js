const CourseRepository = require('../domain/repositories/CourseRepository');
const Courses = require('../domain/entities/Courses');
const sequelizeDatabase = require('../config/Database');
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
  async getAll() {
    return await CoursesModel.findAll();
  }
}

module.exports = SequelizeCoursesRepository;