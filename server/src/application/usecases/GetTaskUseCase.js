const Response = require('../../domain/entities/Response');

class GetTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async findById(taskId) {
        const response = new Response();
        try {
            let taskById = await this.taskRepository.findById(taskId);
            if (!taskById) {
                throw new Error('task not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'task found';
            response.data = taskById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'task not found';
            response.error = error.message;      
          }
        return response;
    }

    async getAll() {
      const response = new Response();
      try {
          let TaskAll = await this.taskRepository.getAll();
          if (!TaskAll) {
              throw new Error('task not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'task found';
          response.data = TaskAll;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'task not found';
          response.error = error.message;      
        }
      return response;
    }

    async findByUserId(userId) {
      const response = new Response();
      try {
          let tskUserData = await this.taskRepository.getByUserId(userId);
          if (!tskUserData) {
              throw new Error('task not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'task found';
          response.data = tskUserData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'task not found';
          response.error = error.message;      
        }
      return response;
    }

    async findByRoleId(roleId) {
      const response = new Response();
      try {
          let tskUserData = await this.taskRepository.getByRoleId(roleId);
          if (!tskUserData) {
              throw new Error('task not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'task found';
          response.data = tskUserData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'task not found';
          response.error = error.message;      
        }
      return response;
    }

}

module.exports = GetTaskUseCase