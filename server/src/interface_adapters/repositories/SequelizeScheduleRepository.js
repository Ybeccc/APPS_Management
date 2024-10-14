const ScheduleRepository = require('../../domain/repositories/ScheduleRepository');
const Schedule = require('../../domain/entities/Schedule');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Payroll
const ScheduleModel = sequelizeDatabase.getConnection().define('Schedule', {
    schId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'sch_id'  // Maps to snake_case in the database
    },
    schUsrId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sch_usr_id'
    },
    schScheduleTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'sch_schedule_time'
    },
    schCreatedBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'sch_created_by'
    },
    schCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'sch_created_at'
    }
}, {
  tableName: 'schedule',
  schema: 'users',
  timestamps: false,
});

class SequelizeScheduleRepository extends ScheduleRepository {
  async create(scheduleData) {
    const createdschedule = await ScheduleModel.create(scheduleData);
    return createdschedule;
  }
  async findById(scheduleId) {
    const sch = await ScheduleModel.findOne({
      where: {
        sch_id: scheduleId,
      }
    });
    return sch
  }
  async getAll() {
    return await ScheduleModel.findAll();
  }
}

module.exports = SequelizeScheduleRepository;