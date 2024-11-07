const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateScheduleUseCase {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    async execute(scheduleData) {
        const schedule = {
            schUsrId: scheduleData.schUsrId,
            schScheduleTime: scheduleData.schScheduleTime,
            schCreatedBy: scheduleData.schCreatedBy,
        };

        const response = new Response();

        try {
            let CreatedSchedule = await this.scheduleRepository.create(schedule);
            if (!CreatedSchedule) {
            throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'schedule Created';
            response.data = CreatedSchedule;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create schedule';
            response.error = error.message;      
        }

    return response;
    }
}
 
module.exports = CreateScheduleUseCase