const Response = require('../../domain/entities/Response');

class GetAttendanceUseCase {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    async findById(attendanceId) {
        const response = new Response();
        try {
            let attendanceById = await this.attendanceRepository.findById(attendanceId);
            if (!attendanceById) {
                throw new Error('attendance not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'attendance found';
            response.data = attendanceById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'attendance not found';
            response.error = error;      
          }
        return response;
    }

    async getAll() {
        const response = new Response();
        try {
            let AttendanceAll = await this.attendanceRepository.getAll();
            if (!AttendanceAll) {
                throw new Error('attendance not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'attendance found';
            response.data = AttendanceAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'attendance not found';
            response.error = error;      
          }
        return response;
    }

    async findByRoleId(roleId) {
      const response = new Response();
      try {
          let attendanceData = await this.attendanceRepository.getByRoleId(roleId);
          if (!attendanceData) {
              throw new Error('attendance not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'attendance found';
          response.data = attendanceData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'attendance not found';
          response.error = error;      
        }
      return response;
    }

    async findByUserId(userId) {
      const response = new Response();
      try {
          let attUserData = await this.attendanceRepository.getByUserId(userId);
          if (!attUserData) {
              throw new Error('attendance not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'attendance found';
          response.data = attUserData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'attendance not found';
          response.error = error;      
        }
      return response;
    }

    async findByUsrIdToday(usrId) {
      const response = new Response();
      try {
          let attendanceData = await this.attendanceRepository.getByUsrId(usrId);
          if (!attendanceData) {
              throw new Error('attendance not found');
          }
          response.code = '200';
          response.status = 'success';
          response.message = 'attendance found';
          response.data = attendanceData;
        } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'attendance not found';
          response.error = error;      
        }
      return response;
    }
}

module.exports = GetAttendanceUseCase