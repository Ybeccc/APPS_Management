const AppointmentRepository = require('../../domain/repositories/AppointmentRepository');
const Appointment = require('../../domain/entities/Appointment');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Payroll
const AppointmentModel = sequelizeDatabase.getConnection().define('Appointment', {
    aptId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'apt_id'  // Maps to snake_case in the database
    },
    aptUsrId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'apt_usr_id'
    },
    aptCcId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'apt_cc_id'
    },
    aptCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'apt_created_at'
    }
}, {
  tableName: 'appointment',
  schema: 'users',
  timestamps: false,
});

class SequelizeAppointmentRepository extends AppointmentRepository {
  async create(appointmentData) {
    const createdAppointment = await AppointmentModel.create(appointmentData);
    return createdAppointment;
  }
  async findById(appointmentId) {
    const appt = await AppointmentModel.findOne({
      where: {
        apt_id: appointmentId,
      }
    });
    return appt
  }
  async getAll() {
    return await AppointmentModel.findAll();
  }
  async update(appointmentId, appointmentData){
    const [affectedRows] = await AppointmentModel.update(
      appointmentData,  
      {
        where: { aptId: appointmentId } 
      }
    );

    if (affectedRows === 0) {
      console.log('No rows updated.');
      return null;  
    }

    const updatedAppointment = await AppointmentModel.findByPk(appointmentId);
    return updatedAppointment;
  }
  async getByRoleId(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const [results] = await sequelize.query(
        'SELECT * FROM users.get_appointment_by_role_id(:roleId)', // Call the stored function
        {
          replacements: { roleId }, 
          type: sequelize.QueryTypes.SELECT
        }
      );
      return Array.isArray(results) ? results : results ? [results] : []; ;
    } catch (error) {
      console.error('Error calling stored function:', error);
      throw error;
    }
  }
}

module.exports = SequelizeAppointmentRepository;