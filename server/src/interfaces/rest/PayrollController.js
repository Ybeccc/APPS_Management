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
            res
                .status(500)
                .json({message: error.message});
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
            .json({message: error.message});
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
            .json({message: error.message});
        }
    }
    async updatePayroll(req, res) {
        try {
            const payrollId = req.params.id;
            const payrollData = req.body;
            let payrollInserted = await this.getPayrollUseCase.findById(payrollId);
            if (!payrollInserted.data) {
                throw new Error('Payroll not found');
            }
            const response = await this.updatePayrollUseCase.updatePayroll(payrollId,payrollData);
          res
            .status(201)
            .json(response);
        } catch (error) {
          res.status(500)
          .json({message: error.message});
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
            .json({message: error.message});
        }
    }
    async getPayrollByRoleId(req, res) {
        try {
            const roleId = req.params.id;
            const response = await this.getPayrollUseCase.findByRoleId(roleId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json({message: error.message});
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
            .json({message: error.message});
        }
    }
}

module.exports = PayrollController;