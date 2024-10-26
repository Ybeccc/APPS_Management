const { response } = require('express');
const GetApplicantUseCase = require('../application/GetApplicantUseCase');
const CreateApplicantUseCase = require('../application/CreateApplicantUseCase');
const SequelizeApplicantRepository = require('../interface_adapters/SequelizeApplicantRepository');

class ClassesController {
    constructor() {
        this.applicantRepository = new SequelizeApplicantRepository();
        this.createApplicantUseCase = new CreateApplicantUseCase(this.applicantRepository);
        this.getApplicantUseCase = new GetApplicantUseCase(this.applicantRepository);
    }

    async createApplicant(req, res) {
        try {
        const applicantData = req.body;
        const response = await this.createApplicantUseCase.execute(applicantData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }

    async getAll(req, res) {
        try {
        const response = await this.getApplicantUseCase.getAll();
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

module.exports = ClassesController;