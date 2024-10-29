const { response } = require('express');
const CreateAppointmentUseCase = require('../../application/usecases/CreateAppointmentUseCase');
const GetAppointmentUseCase = require('../../application/usecases/GetAppointmentUseCase');
const UpdateAppointmentUseCase = require('../../application/usecases/UpdateAppointmentUseCase');
const SequelizeAppointmentRepository = require('../../interface_adapters/repositories/SequelizeAppointmentRepository');

class AppointmentController {
    constructor() {
        this.appointmentRepository = new SequelizeAppointmentRepository();
        this.createAppointmentUseCase = new CreateAppointmentUseCase(this.appointmentRepository);
        this.getAppointmentUseCase = new GetAppointmentUseCase(this.appointmentRepository);
        this.updateAppointmentUseCase = new UpdateAppointmentUseCase(this.appointmentRepository);
    }

    async createAppointment(req, res) {
        try {
        const appointmentData = req.body;
        const response = await this.createAppointmentUseCase.execute(appointmentData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }
    async getAppointmentById(req, res) {
        try {
        const appointmentId = req.params.id;
        const response = await this.getAppointmentUseCase.findById(appointmentId);
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
        const response = await this.getAppointmentUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async updateAppointment(req, res) {
        try {
          const appointmentData = req.body;
          const response = await this.updateAppointmentUseCase.updateAppointment(appointmentData);
          res
            .status(201)
            .json(response);
        } catch (error) {
          res.status(500).json(response);
        }
    }
    async getAppointmentByRoleId(req, res) {
        try {
        const roleId = req.params.id;
        const response = await this.getAppointmentUseCase.findByRoleId(roleId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
}

module.exports = AppointmentController;