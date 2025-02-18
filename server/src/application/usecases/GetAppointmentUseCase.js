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
            response.error = error.message;      
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
            response.error = error.message;      
          }
        return response;
    }

    async findByRoleId(roleId) {
      const response = new Response();
      try {
          let appointmentData = await this.appointmentRepository.getByRoleId(roleId);
          if (!appointmentData) {
              throw new Error('appointment not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'appointment found';
          response.data = appointmentData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'appointment not found';
          response.error = error.message;      
        }
      return response;
    }

    async findByUserId(userId) {
      const response = new Response();
      try {
          let aptUserData = await this.appointmentRepository.getByUserId(userId);
          if (!aptUserData) {
              throw new Error('appointment not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'appointment found';
          response.data = aptUserData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'appointment not found';
          response.error = error.message;      
        }
      return response;
    }

    async findAll() {
      const response = new Response();
      try {
          let aptData = await this.appointmentRepository.findAll();
          if (!aptData) {
              throw new Error('appointment not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'appointment found';
          response.data = aptData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'appointment not found';
          response.error = error.message;      
        }
      return response;
    }

}

module.exports = GetAppointmentUseCase