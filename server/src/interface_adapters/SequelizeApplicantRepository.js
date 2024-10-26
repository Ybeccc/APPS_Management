const ApplicantRepository = require('../domain/repositories/ApplicantRepository');
const Applicant = require('../domain/entities/Applicant');
const sequelizeDatabase = require('../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Classes
const ApplicantModel = sequelizeDatabase.getConnection().define('Applicant', {
    aplId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'apl_id'  // Maps to snake_case in the database
    },
    aplName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'apl_name'
    },
    aplNim: {
        type: DataTypes.STRING(9),
        allowNull: false,
        field: 'apl_nim'
    },
    aplEmail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'apl_email'
    },
    aplProdi: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'apl_prodi'
    },
    aplAkt: {
        type: DataTypes.STRING(2),
        allowNull: false,
        field: 'apl_akt'
    },
    aplCrsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'apl_crs_id'
    },
    aplCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'apl_created_at'
    }
}, {
  tableName: 'applicant',
  schema: 'users',
  timestamps: false,
});

class SequelizeApplicantRepository extends ApplicantRepository {
    async create(applicantData) {
        const createdApplicant = await ApplicantModel.create(applicantData);
        return createdApplicant;
    }
    async getAll() {
        return await ApplicantModel.findAll();
    }
}

module.exports = SequelizeApplicantRepository;