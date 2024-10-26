const ClassRepository = require('../domain/repositories/ClassRepository');
const Classes = require('../domain/entities/Classes');
const sequelizeDatabase = require('../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Classes
const ClassesModel = sequelizeDatabase.getConnection().define('Class', {
    cssId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'css_id'  // Maps to snake_case in the database
    },
    cssClassName: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        field: 'css_class_name'
    },
    cssCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'css_created_at'
    }
}, {
  tableName: 'class',
  schema: 'users',
  timestamps: false,
});

class SequelizeClassesRepository extends ClassRepository {
  async getAll() {
    return await ClassesModel.findAll();
  }
}

module.exports = SequelizeClassesRepository;