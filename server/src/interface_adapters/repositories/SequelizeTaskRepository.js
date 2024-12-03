const TaskRepository = require('../../domain/repositories/TaskRepository');
const Task = require('../../domain/entities/Task');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for Payroll
const TaskModel = sequelizeDatabase.getConnection().define('Task', {
    tskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'tsk_id'  // Maps to snake_case in the database
    },
    tskAptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tsk_apt_id'
    },
    tskTaskName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'tsk_task_name'
    },
    tskDescription: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'tsk_description'
    },
    tskNotes: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'tsk_notes'
    },
    tskCreatedBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'tsk_created_by'
    },
    tskCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'tsk_created_at'
    }
}, {
  tableName: 'task',
  schema: 'users',
  timestamps: false,
});

class SequelizeTaskRepository extends TaskRepository {
  async create(taskData) {
    const createdtask = await TaskModel.create(taskData);
    return createdtask;
  }
  async findById(taskId) {
    const tsk = await TaskModel.findOne({
      where: {
        tsk_id: taskId,
      }
    });
    return tsk
  }
  async getAll() {
    return await TaskModel.findAll();
  }
  async update(tskId, taskData){
    const [affectedRows] = await TaskModel.update(
        taskData,  
      {
        where: { tskId: tskId } 
      }
    );

    if (affectedRows === 0) {
      console.log('No rows updated.');
      return null;  
    }

    const updatedTask = await TaskModel.findOne({ where: { tskId } });
    return updatedTask;
  }
  async getByUserId(userId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_task_by_user_id(:userId)', // Call the stored function
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
  async getByRoleId(roleId) {
    const sequelize = sequelizeDatabase.getConnection();

    try {
      const results = await sequelize.query(
        'SELECT * FROM users.get_task_by_role_id(:roleId)', // Call the stored function
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

module.exports = SequelizeTaskRepository;