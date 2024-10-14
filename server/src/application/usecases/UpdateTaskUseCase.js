const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateTaskUseCase {
    constructor(taskRepository, getTaskUseCase) {
        this.taskRepository = taskRepository;
        this.getTaskUseCase = getTaskUseCase;
    }

    async updatetask(taskData) {
        const response = new Response();

        try {
        let taskInserted = await this.getTaskUseCase.findById(taskData.tskId);
        if (!taskInserted.data) {
            throw new Error('task not found');
        }

        let taskUpdated = await this.taskRepository.update(taskData.tskId, taskData)
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