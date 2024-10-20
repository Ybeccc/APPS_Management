const express = require('express');
const db = require("../../config/Database.js");

const UserController = require('../../interfaces/rest/UserController');
const AuthController = require('../../interfaces/rest/AuthController');
const PayrollController = require('../../interfaces/rest/PayrollController');
const ClassesController = require('../../interfaces/rest/ClassesController');
const CoursesController = require('../../interfaces/rest/CoursesController');
const ClassCourseController = require('../../interfaces/rest/ClassCourseController');
const AppointmentController = require('../../interfaces/rest/AppointmentController');
const AttendanceController = require('../../interfaces/rest/AttendanceController');
const ScheduleController = require('../../interfaces/rest/ScheduleController');
const TaskController = require('../../interfaces/rest/TaskController');

const router = express.Router();

// Initiate the controller
const userController = new UserController();
const authController = new AuthController();
const payrollController = new PayrollController();
const classesController = new ClassesController();
const coursesController = new CoursesController();
const classCourseController = new ClassCourseController();
const appointmentController = new AppointmentController();
const attendanceController = new AttendanceController();
const scheduleController = new ScheduleController();
const taskController = new TaskController();

// user routes
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.get('/users', (req, res) => userController.getAll(req, res));
router.post('/update/users', (req, res) => userController.updateUser(req, res));

// auth routes
router.get('/me', (req, res) => authController.Me(req, res));
router.post('/login', (req, res) => authController.Login(req, res));
router.delete('/logout', (req, res) => authController.logOut(req, res));

// payroll routes
router.post('/payrolls', (req, res) => payrollController.createPayroll(req, res));
router.get('/payrolls/:id', (req, res) => payrollController.getPayrollById(req, res));
router.get('/payrolls', (req, res) => payrollController.getAll(req, res));
router.post('/update/payrolls', (req, res) => payrollController.updatePayroll(req, res));
router.delete('/delete/payrolls/:id', (req, res) => payrollController.deletePayroll(req, res));

// class routes
router.get('/classes', (req, res) => classesController.getAll(req, res));

// course routes
router.get('/courses', (req, res) => coursesController.getAll(req, res));

// classcourse routes
router.post('/classcourse', (req, res) => classCourseController.createCC(req, res));
router.get('/classcourse/:id', (req, res) => classCourseController.getCCById(req, res));
router.get('/classcourse', (req, res) => classCourseController.getAll(req, res));

// appointment routes
router.post('/appointment', (req, res) => appointmentController.createAppointment(req, res));
router.get('/appointment/:id', (req, res) => appointmentController.getAppointmentById(req, res));
router.get('/appointment', (req, res) => appointmentController.getAll(req, res));
router.post('/appointment/update', (req, res) => appointmentController.updateAppointment(req, res));

// attendance routes
router.post('/attendance', (req, res) => attendanceController.createAttendance(req, res));
router.get('/attendance/:id', (req, res) => attendanceController.getAttendanceById(req, res));
router.get('/attendance', (req, res) => attendanceController.getAll(req, res));
router.post('/attendance/update', (req, res) => attendanceController.updateAttendance(req, res));

// schedule routes
router.post('/schedule', (req, res) => scheduleController.createSchedule(req, res));
router.get('/schedule/:id', (req, res) => scheduleController.getScheduleById(req, res));
router.get('/schedule', (req, res) => scheduleController.getAll(req, res));

// task routes
router.post('/task', (req, res) => taskController.createTask(req, res));
router.get('/task/:id', (req, res) => taskController.getTaskById(req, res));
router.get('/task', (req, res) => taskController.getAll(req, res));
router.post('/task/update', (req, res) => taskController.updateTask(req, res));

module.exports = router;