const express = require('express');
const db = require("../config/Database.js");

const ClassesController = require('../interfaces/ClassesController.js');
const CoursesController = require('../interfaces/CoursesController.js');
const ApplicantController = require('../interfaces/ApplicantController.js')

const router = express.Router();

const classesController = new ClassesController();
const coursesController = new CoursesController();
const applicantController = new ApplicantController();

// class routes
router.get('/classes', (req, res) => classesController.getAll(req, res));

// course routes
router.get('/courses', (req, res) => coursesController.getAll(req, res));

// applicant routes
// payroll routes
router.post('/applicant', (req, res) => applicantController.createApplicant(req, res));
router.get('/applicant', (req, res) => applicantController.getAll(req, res));

module.exports = router;