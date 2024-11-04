const { response } = require('express');
const CreateAttendanceUseCase = require('../../application/usecases/CreateAttendanceUseCase');
const GetAttendanceUseCase = require('../../application/usecases/GetAttendanceUseCase');
const UpdateAttendanceUseCase = require('../../application/usecases/UpdateAttendanceUseCase');
const SequelizeAttendanceRepository = require('../../interface_adapters/repositories/SequelizeAttendanceRepository');

class AttendanceController {
    constructor() {
        this.attendanceRepository = new SequelizeAttendanceRepository();
        this.createAttendanceUseCase = new CreateAttendanceUseCase(this.attendanceRepository);
        this.getAttendanceUseCase = new GetAttendanceUseCase(this.attendanceRepository);
        this.updateAttendanceUseCase = new UpdateAttendanceUseCase(this.attendanceRepository);
    }

    async createAttendance(req, res) {
        try {
            const attendanceData = req.body;
            let insertedAttendance = await this.getAttendanceUseCase.findByUsrIdToday(attendanceData.usrId);
            if (insertedAttendance.data.some(item => item.att_apt_id === attendanceData.attAptId)) {
                return res
                .status(400)
                .json({message: "Attendance Already Exists"});
            }

            const response = await this.createAttendanceUseCase.execute(attendanceData);
            res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }
    async getAttendanceById(req, res) {
        try {
        const attendanceId = req.params.id;
        const response = await this.getAttendanceUseCase.findById(attendanceId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async getAll(req, res) {
        try {
        const response = await this.getAttendanceUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
    async updateAttendance(req, res) {
        try {
          const attendanceData = req.body;

            let insertedAttendance = await this.getAttendanceUseCase.findByUsrIdToday(attendanceData.usrId);
            if (!insertedAttendance.data.some(item => item.att_apt_id === attendanceData.attAptId)) {
                return res
                .status(400)
                .json({message: "Attendance Not Exists"});
            }

            const attendance = insertedAttendance.data.find(item => item.att_apt_id === attendanceData.attAptId);

            if(attendance.check_out){
                return res
                .status(400)
                .json({message: "Attendance Checked Out"});
            }

            const attId = attendance ? attendance.att_id : null;
            const response = await this.updateAttendanceUseCase.updateAttendance(attId);
            res
                .status(200)
                .json(response);
        } catch (error) {
            res.status(500).json(response);
        }
    }
    async getAttendanceByRoleId(req, res) {
        try {
        const roleId = req.params.id;
        const response = await this.getAttendanceUseCase.findByRoleId(roleId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }

    async getTodayAttendanceByUsrId(req, res) {
        try {
        const usrId = req.params.usrId;
        const response = await this.getAttendanceUseCase.findByUsrIdToday(usrId);
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json(response);
        }
    }
}

module.exports = AttendanceController;