const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdatePayrollUseCase {
    constructor(payrollRepository, getPayrollUseCase) {
        this.payrollRepository = payrollRepository;
        this.getPayrollUseCase = getPayrollUseCase;
    }

    async updatePayroll(prlId,payrollData) {
        const response = new Response();

        try {
            const payrollRequest = {
                prlUserId: payrollData.prlUserId,
                prlNominal: payrollData.prlNominal,
                prlPayrollStatus: payrollData.prlPayrollStatus
            };
            

            let payrollUpdated = await this.payrollRepository.update(prlId, payrollRequest)
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
            response.error = error.message;      
        }
        return response;
    }
}

module.exports = UpdatePayrollUseCase;