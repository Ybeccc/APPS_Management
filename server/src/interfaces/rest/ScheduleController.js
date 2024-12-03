const { response } = require('express');
const CreateScheduleUseCase = require('../../application/usecases/CreateScheduleUseCase');
const GetScheduleUseCase = require('../../application/usecases/GetScheduleUseCase');
const SequelizeScheduleRepository = require('../../interface_adapters/repositories/SequelizeScheduleRepository');

class ScheduleController {
    constructor() {
        this.scheduleRepository = new SequelizeScheduleRepository();
        this.createScheduleUseCase = new CreateScheduleUseCase(this.scheduleRepository);
        this.getScheduleUseCase = new GetScheduleUseCase(this.scheduleRepository);
    }

    async createSchedule(req, res) {
        try {
        const scheduleData = req.body;
        const response = await this.createScheduleUseCase.execute(scheduleData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500)
        .json({message: error.message});
    }
    }
    async getScheduleById(req, res) {
        try {
        const scheduleId = req.params.id;
        const response = await this.getScheduleUseCase.findById(scheduleId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json({message: error.message});
        }
    }
    async getAll(req, res) {
        try {
        const response = await this.getScheduleUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json({message: error.message});
        }
    }
}

module.exports = ScheduleController;