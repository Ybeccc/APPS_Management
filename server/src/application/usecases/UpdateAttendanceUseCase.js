const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateAttendanceUseCase {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    async updateAttendance(attId) {
        const response = new Response();

        try {
        const checkOutTime = this.getCurrentTime();
        let attendanceUpdated = await this.attendanceRepository.updateAttendanceCheckOut(attId, checkOutTime)
        if (!attendanceUpdated) {
            throw new Error('attendance failed update');
        }

        response.code = '200';
        response.status = 'success';
        response.message = 'attendance Updated';
        response.data = attendanceUpdated;
        } catch (error) {
        response.code = '400';
        response.status = 'failed';
        response.message = 'failed update attendance';
        response.error = error;      
        }
        return response;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().split(' ')[0];  // Extract only the time part (HH:MM:SS)
    }
}

module.exports = UpdateAttendanceUseCase;