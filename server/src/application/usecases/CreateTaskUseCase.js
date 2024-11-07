const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(taskData) {
        const task = {
            tskAptId: taskData.tskAptId,
            tskTaskName: taskData.tskTaskName,
            tskDescription: taskData.tskDescription,
            tskNotes: taskData.tskNotes,
            tskCreatedBy: taskData.tskCreatedBy,
        };

        const response = new Response();

        try {
            let CreatedTask = await this.taskRepository.create(task);
            if (!CreatedTask) {
            throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'task Created';
            response.data = CreatedTask;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create task';
            response.error = error.message;      
        }

    return response;
    }
}
 
module.exports = CreateTaskUseCase