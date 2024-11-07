const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateTaskUseCase {
    constructor(taskRepository, getTaskUseCase) {
        this.taskRepository = taskRepository;
        this.getTaskUseCase = getTaskUseCase;
    }

    async updateTask(tskId,taskData) {
        const response = new Response();

        try {
            const taskObject = {
                tskAptId: taskData.tskAptId,
                tskTaskName: taskData.tskTaskName, 
                tskDescription: taskData.tskDescription,
                tskNotes: taskData.tskNotes
            };

            let taskUpdated = await this.taskRepository.update(tskId, taskObject)
            if (!taskUpdated) {
                throw new Error('task failed update');
            }

            response.code = '200';
            response.status = 'success';
            response.message = 'task Updated';
            response.data = taskUpdated;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed update task';
            response.error = error;      
        }
        return response;
    }
}

module.exports = UpdateTaskUseCase;