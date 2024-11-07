const ClassCourseRepository = require('../../domain/repositories/ClassCourseRepository');
const ClassCourse = require('../../domain/entities/ClassCourse');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Payroll
const ClassCourseModel = sequelizeDatabase.getConnection().define('ClassCourse', {
    ccId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'cc_id'  // Maps to snake_case in the database
    },
    ccCrsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cc_crs_id'
    },
    ccCssId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cc_css_id'
    },
    ccCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'cc_created_at'
    }
}, {
  tableName: 'classcourse',
  schema: 'users',
  timestamps: false,
});

class SequelizeClassCourseRepository extends ClassCourseRepository {
  async create(classCourseData) {
    const createdClassCourse = await ClassCourseModel.create(classCourseData);
    return createdClassCourse;
  }
  async findById(classcourseId) {
    const cc = await ClassCourseModel.findOne({
      where: {
        cc_id: classcourseId,
      }
    });
    return cc
  }
  async getAll() {
    return await ClassCourseModel.findAll();
  }
  async findAll() {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_all_classcourse()', // Call the stored function
        {
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

module.exports = SequelizeClassCourseRepository;