const { response } = require('express');
const CreatePayrollUseCase = require('../../application/usecases/CreatePayrollUseCase');
const GetPayrollUseCase = require('../../application/usecases/GetPayrollUseCase');
const DeletePayrollUseCase = require('../../application/usecases/DeletePayrollUseCase');
const UpdatePayrollUseCase = require('../../application/usecases/UpdatePayrollUseCase');
const SequelizePayrollRepository = require('../../interface_adapters/repositories/SequelizePayrollRepository');

class PayrollController {
    constructor() {
        this.payrollRepository = new SequelizePayrollRepository();
        this.createPayrollUseCase = new CreatePayrollUseCase(this.payrollRepository);
        this.getPayrollUseCase = new GetPayrollUseCase(this.payrollRepository);
        this.updatePayrollUseCase = new UpdatePayrollUseCase(this.payrollRepository);
        this.deletePayrollUseCase = new DeletePayrollUseCase(this.payrollRepository);
    }

    async createPayroll(req, res) {
        try {
        const payrollData = req.body;
        const response = await this.createPayrollUseCase.execute(payrollData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }
    async getPayrollById(req, res) {
        try {
        const payrollId = req.params.id;
        const response = await this.getPayrollUseCase.findById(payrollId);
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
        const response = await this.getPayrollUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async updatePayroll(req, res) {
        try {
          const payrollData = req.body;
          const response = await this.updatePayrollUseCase.updatePayroll(payrollData);
          res
            .status(201)
            .json(response);
        } catch (error) {
          res.status(500).json(response);
        }
    }
    async deletePayroll(req, res) {
        try {
        const payrollId = req.params.id;
        const response = await this.deletePayrollUseCase.delete(payrollId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async getAllPayroll(req, res) {
        try {
        const response = await this.getPayrollUseCase.findAllPayroll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async getPayrollByUserId(req, res) {
        try {
        const userId = req.params.id;
        const response = await this.getPayrollUseCase.findByUserId(userId);
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

module.exports = PayrollController;