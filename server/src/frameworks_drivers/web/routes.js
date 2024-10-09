const express = require('express');
const UserController = require('../../interfaces/rest/UserController');

const router = express.Router();

// Instantiate the controller
const userController = new UserController();

// Define routes
router.post('/users', (req, res) => userController.createUser(req, res));

module.exports = router;