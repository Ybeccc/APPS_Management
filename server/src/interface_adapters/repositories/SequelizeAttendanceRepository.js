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
  async updateAttendanceCheckOut(attId, newCheckOutTime) {
    try {
        const [updatedRows] = await AttendanceModel.update(
            { attCheckOut: newCheckOutTime },
            { where: { attId: attId } }
        );

        if (updatedRows === 0) {
          return null;
        } 

        const updatedAttendance = await AttendanceModel.findOne({ where: { attId } });
        return updatedAttendance;
    } catch (error) {
        return null;
    }
  }
  async getByRoleId(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_attendance_by_role_id(:roleId)',
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
  async getByUserId(userId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_attendance_by_user_id(:userId)',
        {
          replacements: { userId }, 
          type: sequelize.QueryTypes.SELECT
        }
      );
      return Array.isArray(results) ? results : results ? [results] : [];
    } catch (error) {
      console.error('Error calling stored function:', error);
      throw error;
    }
  }
  async getByUsrId(usrId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_attendance_today_by_usr_id(:usrId)', // Call the stored function
        {
          replacements: { usrId }, 
          type: sequelize.QueryTypes.SELECT
        }
      );
      return Array.isArray(results) ? results : results ? [results] : [];
    } catch (error) {
      console.error('Error calling stored function:', error);
      throw error;
    }
  }
  async getAssistantAttendance(userId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_assistant_attendance(:userId)',
        {
          replacements: { userId }, 
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