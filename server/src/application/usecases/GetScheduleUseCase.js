const Response = require('../../domain/entities/Response');

class GetScheduleUseCase {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    async findById(scheduleId) {
        const response = new Response();
        try {
            let scheduleById = await this.scheduleRepository.findById(scheduleId);
            if (!scheduleById) {
                throw new Error('schedule not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'schedule found';
            response.data = scheduleById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'schedule not found';
            response.error = error.message;      
          }
        return response;
    }

    async getAll() {
        const response = new Response();
        try {
            let ScheduleAll = await this.scheduleRepository.getAll();
            if (!ScheduleAll) {
                throw new Error('schedule not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'schedule found';
            response.data = ScheduleAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'schedule not found';
            response.error = error.message;      
          }
        return response;
    }

}

module.exports = GetScheduleUseCase