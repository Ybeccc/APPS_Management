const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateAttendanceUseCase {
    constructor(attendanceRepository, getAttendanceUseCase) {
        this.attendanceRepository = attendanceRepository;
        this.getAttendanceUseCase = getAttendanceUseCase;
    }

    async updateAttendance(attendanceData) {
        const response = new Response();

        try {
        let attendanceInserted = await this.getAttendanceUseCase.findById(attendanceData.prlId);
        if (!attendanceInserted.data) {
            throw new Error('attendance not found');
        }

        let attendanceUpdated = await this.attendanceRepository.update(attendanceData.prlId, attendanceData)
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
}

module.exports = UpdateAttendanceUseCase;