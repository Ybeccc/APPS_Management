const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateAttendanceUseCase {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    async execute(attendanceData) {
        const response = new Response();

        try {
            const attendance = {
                attAptId: attendanceData.attAptId,
                attCheckIn: this.getCurrentTime(),
                attCreatedBy: attendanceData.attCreatedBy,
            };

            let CreatedAttendance = await this.attendanceRepository.create(attendance);
            if (!CreatedAttendance) {
            throw new Error('Failed Insert Attendance');
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

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().split(' ')[0];  // Extract only the time part (HH:MM:SS)
    }
}
 
module.exports = CreateAttendanceUseCase