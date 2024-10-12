const Response = require('../../domain/entities/Response');

class GetAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    async findById(appointmentId) {
        const response = new Response();
        try {
            let appointmentById = await this.appointmentRepository.findById(appointmentId);
            if (!appointmentById) {
                throw new Error('appointment not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'appointment found';
            response.data = appointmentById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'appointment not found';
            response.error = error;      
          }
        return response;
    }

    async getAll() {
        const response = new Response();
        try {
            let AppointmentAll = await this.appointmentRepository.getAll();
            if (!AppointmentAll) {
                throw new Error('appointment not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'appointment found';
            response.data = AppointmentAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'appointment not found';
            response.error = error;      
          }
        return response;
    }

}

module.exports = GetAppointmentUseCase