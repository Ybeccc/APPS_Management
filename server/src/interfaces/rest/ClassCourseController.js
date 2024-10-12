const { response } = require('express');
const CreateClassCourseUseCase = require('../../application/usecases/CreateClassCourseUseCase');
const GetClassCourseUseCase = require('../../application/usecases/GetClassCourseUseCase');
const SequelizeClassCourseRepository = require('../../interface_adapters/repositories/SequelizeClassCourseRepository');

class ClassCourseController {
    constructor() {
        this.classCourseRepository = new SequelizeClassCourseRepository();
        this.createClassCourseUseCase = new CreateClassCourseUseCase(this.classCourseRepository);
        this.getClassCourseUseCase = new GetClassCourseUseCase(this.classCourseRepository);
    }

    async createCC(req, res) {
        try {
        const ccData = req.body;
        const response = await this.createClassCourseUseCase.execute(ccData);
        res
            .status(201)
            .json(response);
        } catch (error) {
        res.status(500).json(response);
        }
    }
    async getCCById(req, res) {
        try {
        const ccId = req.params.id;
        const response = await this.getClassCourseUseCase.findById(ccId);
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
        const response = await this.getClassCourseUseCase.getAll();
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

module.exports = ClassCourseController;