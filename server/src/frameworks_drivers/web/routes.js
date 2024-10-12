const express = require('express');
const UserController = require('../../interfaces/rest/UserController');
const AuthController = require('../../interfaces/rest/AuthController');
const PayrollController = require('../../interfaces/rest/PayrollController');
const ClassesController = require('../../interfaces/rest/ClassesController');
const CoursesController = require('../../interfaces/rest/CoursesController');
const ClassCourseController = require('../../interfaces/rest/ClassCourseController');

const router = express.Router();

// Instantiate the controller
const userController = new UserController();
const authController = new AuthController();
const payrollController = new PayrollController();
const classesController = new ClassesController();
const coursesController = new CoursesController();
const classCourseController = new ClassCourseController();

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

module.exports = router;