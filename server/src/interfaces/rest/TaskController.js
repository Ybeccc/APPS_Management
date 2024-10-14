const { response } = require('express');
const CreateTaskUseCase = require('../../application/usecases/CreateTaskUseCase');
const GetTaskUseCase = require('../../application/usecases/GetTaskUseCase');
const UpdateTaskUseCase = require('../../application/usecases/UpdateTaskUseCase');
const SequelizeTaskRepository = require('../../interface_adapters/repositories/SequelizeTaskRepository');

class TaskController {
    constructor() {
        this.taskRepository = new SequelizeTaskRepository();
        this.createTaskUseCase = new CreateTaskUseCase(this.taskRepository);
        this.getTaskUseCase = new GetTaskUseCase(this.taskRepository);
        this.updateTaskUseCase = new UpdateTaskUseCase(this.taskRepository);
    }

    async createTask(req, res) {
        try {
        const taskData = req.body;
        const response = await this.createTaskUseCase.execute(taskData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }
    async getTaskById(req, res) {
        try {
        const taskId = req.params.id;
        const response = await this.getTaskUseCase.findById(taskId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async getAll(req, res) {
        try {
        const response = await this.getTaskUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async updateTask(req, res) {
        try {
          const taskData = req.body;
          const response = await this.updateTaskUseCase.updateTask(taskData);
          res
            .status(201)
            .json(response);
        } catch (error) {
          res.status(500).json(response);
        }
    }
}

module.exports = TaskController;