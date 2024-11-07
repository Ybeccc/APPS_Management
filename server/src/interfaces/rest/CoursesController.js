const { response } = require('express');
const GetCoursesUseCase = require('../../application/usecases/GetCoursesUseCase');
const SequelizeCoursesRepository = require('../../interface_adapters/repositories/SequelizeCoursesRepository');

class ClassesController {
    constructor() {
        this.CourseRepository = new SequelizeCoursesRepository();
        this.getCoursesUseCase = new GetCoursesUseCase(this.CourseRepository);
    }

    async getAll(req, res) {
        try {
        const response = await this.getCoursesUseCase.getAll();
        res
            .status(200)
            .json(response);
        } catch (error) {
        res
            .status(500)
            .json({message: error.message});
        }
    }
}

module.exports = ClassesController;