const Response = require('../../domain/entities/Response');

class GetPayrollUseCase {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    async findById(payrollId) {
        const response = new Response();
        try {
            let payrollById = await this.payrollRepository.findById(payrollId);
            if (!payrollById) {
                throw new Error('Payroll not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Payroll found';
            response.data = payrollById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'payroll not found';
            response.error = error;      
          }
        return response;
    }

    async getAll() {
      const response = new Response();
      try {
          let PayrollAll = await this.payrollRepository.getAll();
          if (!PayrollAll) {
              throw new Error('Payroll not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'Payroll found';
          response.data = PayrollAll;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'payroll not found';
          response.error = error;      
        }
      return response;
    }

    async findAllPayroll() {
      const response = new Response();
      try {
          let allPayrollData = await this.payrollRepository.findAllPayroll();
          if (!allPayrollData) {
              throw new Error('payroll not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'payroll found';
          response.data = allPayrollData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'payroll not found';
          response.error = error;      
        }
      return response;
    }

}

module.exports = GetPayrollUseCase