const AttendanceRepository = require('../../domain/repositories/AttendanceRepository');
const Attendance = require('../../domain/entities/Attendance');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Payroll
const AttendanceModel = sequelizeDatabase.getConnection().define('Attendance', {
    attId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'att_id'  // Maps to snake_case in the database
    },
    attAptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'att_apt_id'
    },
    attCheckIn: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'att_check_in'
    },
    attCheckOut: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'att_check_out'
    },
    attCreatedBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'att_created_by'
    },
    attCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'att_created_at'
    }
}, {
  tableName: 'attendance',
  schema: 'users',
  timestamps: false,
});

class SequelizeAttendanceRepository extends AttendanceRepository {
  async create(attendanceData) {
    const createdAttendance = await AttendanceModel.create(attendanceData);
    return createdAttendance;
  }
  async findById(attendanceId) {
    const att = await AttendanceModel.findOne({
      where: {
        att_id: attendanceId,
      }
    });
    return att
  }
  async getAll() {
    return await AttendanceModel.findAll();
  }
  async update(attendanceId, attendanceData){
    const [affectedRows] = await AttendanceModel.update(
        attendanceData,  
      {
        where: { attId: attendanceId } 
      }
    );

    if (affectedRows === 0) {
      console.log('No rows updated.');
      return null;  
    }

    const updatedAttendance = await AttendanceModel.findByPk(attendanceId);
    return updatedAttendance;
  }
  async getByRoleId(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_all_attendance(:roleId)', // Call the stored function
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

module.exports = SequelizeAttendanceRepository;