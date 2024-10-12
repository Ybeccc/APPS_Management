const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateAttendanceUseCase {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    async execute(attendanceData) {
        const attendance = {
            attAptId: attendanceData.attAptId,
            attCheckIn: attendanceData.attCheckIn,
            attCheckOut: attendanceData.attCheckOut,
            attCreatedBy: attendanceData.attCreatedBy,
        };

        const response = new Response();

        try {
            let CreatedAttendance = await this.attendanceRepository.create(attendance);
            if (!CreatedAttendance) {
            throw new Error('Attendance not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Attendance Created';
            response.data = CreatedAttendance;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create Attendance';
            response.error = error;      
        }

    return response;
    }
}
 
module.exports = CreateAttendanceUseCase