const PayrollRepository = require('../../domain/repositories/PayrollRepository');
const Payroll = require('../../domain/entities/Payroll');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for User
const PayrollModel = sequelizeDatabase.getConnection().define('Payroll', {
    prlId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'prl_id'  // Maps to snake_case in the database
    },
    prlUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prl_usr_id'
    },
    prlNominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prl_nominal'
    },
    prlPayrollStatus: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'prl_payroll_status'
    },
    prlCreatedBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'prl_created_by'
    },
    prlCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'prl_created_at'
    }
}, {
  tableName: 'user',
  schema: 'payroll',
  timestamps: false,
});

class SequelizePayrollRepository extends PayrollRepository {
  async create(payrollData) {
    const createdPayroll = await PayrollModel.create(payrollData);
    return createdPayroll;
  }
  async findById(payrollId) {
    const payroll = await PayrollModel.findOne({
      where: {
        prl_id: payrollId,
      }
    });
    return payroll
  }
  async getAll() {
    return await PayrollModel.findAll();
  }
}

module.exports = SequelizePayrollRepository;