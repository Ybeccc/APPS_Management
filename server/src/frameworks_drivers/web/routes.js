const express = require('express');
const UserController = require('../../interfaces/rest/UserController');
const AuthController = require('../../interfaces/rest/AuthController');
const PayrollController = require('../../interfaces/rest/PayrollController');

const router = express.Router();

// Instantiate the controller
const userController = new UserController();
const authController = new AuthController();
const payrollController = new PayrollController();

// user routes
router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.get('/users', (req, res) => userController.getAll(req, res));
router.patch('/users/:id', (req, res) => userController.updateUser(req, res));

// auth routes
router.get('/me', (req, res) => authController.Me(req, res));
router.post('/login', (req, res) => authController.Login(req, res));
router.delete('/logout', (req, res) => authController.logOut(req, res));

// user routes
router.post('/payrolls', (req, res) => payrollController.createPayroll(req, res));
router.get('/payrolls/:id', (req, res) => payrollController.getPayrollById(req, res));
router.get('/payrolls', (req, res) => payrollController.getAll(req, res));
router.delete('/delete/payrolls/:id', (req, res) => payrollController.deletePayroll(req, res));

module.exports = router;