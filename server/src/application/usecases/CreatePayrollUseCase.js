const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreatePayrollUseCase {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    async execute(payrollData) {
        const payroll = {
            prlUserId: payrollData.prlUserId,
            prlNominal: payrollData.prlNominal,
            prlPayrollStatus: payrollData.prlPayrollStatus,
            prlCreatedBy: payrollData.prlCreatedBy,
        };

        const response = new Response();

        try {
            let CreatedPayroll = await this.payrollRepository.create(payroll);
            if (!CreatedPayroll) {
            throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Payroll Created';
            response.data = CreatedPayroll;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create payroll';
            response.error = error;      
        }

    return response;
    }
}
 
module.exports = CreatePayrollUseCase