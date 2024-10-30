const PayrollRepository = require('../../domain/repositories/PayrollRepository');
const Payroll = require('../../domain/entities/Payroll');
const sequelizeDatabase = require('../../config/Database');
const UserModel = require('./SequelizeUserRepository');
const { DataTypes } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

// Define the Sequelize model for Payroll
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
  tableName: 'payroll',
  schema: 'users',
  timestamps: false,
});

// CONTOH GABUNGIN FROEIGN KEY
// UserModel.hasMany(PayrollModel);
// PayrollModel.belongsTo(UserModel, {foreignKey: 'prlUserId'});

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
  async update(payrollId, payrollData){
    const [affectedRows] = await PayrollModel.update(
      payrollData,  
      {
        where: { prlId: payrollId } 
      }
    );

    if (affectedRows === 0) {
      console.log('No rows updated.');
      return null;  
    }

    const updatedPayroll = await PayrollModel.findByPk(payrollId);
    return updatedPayroll;
  }
  async delete(payrollId) {
    const result = await PayrollModel.destroy({
      where: {
        prl_id: payrollId,
      }
    });
    return result;
  }
  async findAllPayroll(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_all_payroll()', // Call the stored function
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

module.exports = SequelizePayrollRepository;