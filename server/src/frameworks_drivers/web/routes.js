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
const EmailController = require('../../interfaces/rest/EmailController');
const ApplicantController = require('../../interfaces/rest/ApplicantController');

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
const emailController = new EmailController();
const applicantController = new ApplicantController();

// user routes
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.get('/users', (req, res) => userController.getAll(req, res));
router.post('/user/update/:id', (req, res) => userController.updateUser(req, res));
router.get('/practicumast', (req, res) => userController.listPracticumAst(req, res));
router.get('/studentast', (req, res) => userController.listStudentAst(req, res));
router.post('/users/update/status/:id', (req, res) => userController.updateUserStatus(req, res));
router.post('/users/update/password/:id', (req, res) => userController.updateUserPassword(req, res));

// auth routes
router.get('/me', (req, res) => authController.Me(req, res));
router.post('/login', (req, res) => authController.Login(req, res));
router.delete('/logout', (req, res) => authController.logOut(req, res));

// payroll routes
router.post('/payrolls', (req, res) => payrollController.createPayroll(req, res));
router.get('/payrolls/:id', (req, res) => payrollController.getPayrollById(req, res));
router.get('/payrolls', (req, res) => payrollController.getAll(req, res));
router.post('/payrolls/update/:id', (req, res) => payrollController.updatePayroll(req, res));
router.delete('/delete/payrolls/:id', (req, res) => payrollController.deletePayroll(req, res));
router.get('/payroll/role/:id', (req, res) => payrollController.getPayrollByRoleId(req, res));
router.get('/payroll/user/:id', (req, res) => payrollController.getPayrollByUserId(req, res));

// class routes
router.post('/classes', (req, res) => classesController.createClass(req, res));
router.get('/classes', (req, res) => classesController.getAll(req, res));

// course routes
router.post('/courses', (req, res) => coursesController.createCourse(req, res));
router.get('/courses', (req, res) => coursesController.getAll(req, res));
router.get('/course/listassistant/:id', (req, res) => coursesController.getListAssistantByCourse(req, res));

// classcourse routes
router.post('/classcourse', (req, res) => classCourseController.createCC(req, res));
router.get('/classcourse/:id', (req, res) => classCourseController.getCCById(req, res));
router.get('/classcourse', (req, res) => classCourseController.getAll(req, res));
router.get('/allclasscourse', (req, res) => classCourseController.getAllClassCourse(req, res));

// appointment routes
router.post('/appointment', (req, res) => appointmentController.createAppointment(req, res));
router.get('/appointment/:id', (req, res) => appointmentController.getAppointmentById(req, res));
router.get('/appointment', (req, res) => appointmentController.getAll(req, res));
router.post('/appointment/update', (req, res) => appointmentController.updateAppointment(req, res));
router.get('/appointment/role/:id', (req, res) => appointmentController.getAppointmentByRoleId(req, res));
router.get('/appointment/user/:id', (req, res) => appointmentController.getAppointmentByUserId(req, res));
router.get('/allappointment', (req, res) => appointmentController.getAllAppointment(req, res));

// attendance routes
router.post('/attendance/in', (req, res) => attendanceController.createAttendance(req, res));
router.post('/attendance/out', (req, res) => attendanceController.updateAttendance(req, res));
router.get('/attendance/:id', (req, res) => attendanceController.getAttendanceById(req, res));
router.get('/attendance/today/:usrId', (req, res) => attendanceController.getTodayAttendanceByUsrId(req, res));
router.get('/attendance', (req, res) => attendanceController.getAll(req, res));
router.get('/attendance/role/:id', (req, res) => attendanceController.getAttendanceByRoleId(req, res));
router.get('/attendance/user/:id', (req, res) => attendanceController.getAttendanceByUserId(req, res));
router.get('/assistant/attendance/:id', (req, res) => attendanceController.getAssistantAttendance(req, res));

// schedule routes
router.post('/schedule', (req, res) => scheduleController.createSchedule(req, res));
router.get('/schedule/:id', (req, res) => scheduleController.getScheduleById(req, res));
router.get('/schedule', (req, res) => scheduleController.getAll(req, res));

// task routes
router.post('/task', (req, res) => taskController.createTask(req, res));
router.get('/task/:id', (req, res) => taskController.getTaskById(req, res));
router.get('/task', (req, res) => taskController.getAll(req, res));
router.post('/task/update/:id', (req, res) => taskController.updateTask(req, res));
router.get('/task/user/:id', (req, res) => taskController.getTaskByUserId(req, res));
router.get('/task/role/:id', (req, res) => taskController.getTaskByRoleId(req, res));

//email
router.post('/email/send', (req, res) => emailController.sendEmail(req, res));

//applicant
router.get('/applicant', (req, res) => applicantController.getAll(req, res));


module.exports = router;