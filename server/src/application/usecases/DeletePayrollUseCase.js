const Response = require('../../domain/entities/Response');

class DeletePayrollUseCase {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    async delete(payrollId) {
        const response = new Response();
    
        try {
            let payrollData = await this.payrollRepository.findById(payrollId);
            if (!payrollData) {
                throw new Error('Payroll not found');
            }

            let deleteResult = await this.payrollRepository.delete(payrollId);
            if (deleteResult === 0) {
                throw new Error('Failed');
            }

            response.code = '200';
            response.status = 'success';
            response.message = 'Payroll deleted successfully';
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'Failed to delete payroll';
            response.error = error.message;      
        }
        
        return response;
    }    
}

module.exports = DeletePayrollUseCase;
