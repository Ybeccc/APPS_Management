const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdatePayrollUseCase {
    constructor(payrollRepository, getPayrollUseCase) {
        this.payrollRepository = payrollRepository;
        this.getPayrollUseCase = getPayrollUseCase;
    }

    async updatePayroll(payrollData) {
        const response = new Response();

        try {
        let payrollInserted = await this.getUserUseCase.findById(payrollData.prlId);
        if (!payrollInserted.data) {
            throw new Error('Payroll not found');
        }

        let payrollUpdated = await this.userRepository.update(payrollData.prlId, payrollData)
        if (!payrollUpdated) {
            throw new Error('Payroll failed update');
        }

        response.code = '200';
        response.status = 'success';
        response.message = 'Payroll Updated';
        response.data = payrollUpdated;
        } catch (error) {
        response.code = '400';
        response.status = 'failed';
        response.message = 'failed update payroll';
        response.error = error;      
        }
        return response;
    }
}

module.exports = UpdatePayrollUseCase;