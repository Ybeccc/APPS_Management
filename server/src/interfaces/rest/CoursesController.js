const { response } = require('express');
const GetCoursesUseCase = require('../../application/usecases/GetCoursesUseCase');
const CreateCourseUseCase = require('../../application/usecases/CreateCourseUseCase');
const SequelizeCoursesRepository = require('../../interface_adapters/repositories/SequelizeCoursesRepository');

class ClassesController {
    constructor() {
        this.CourseRepository = new SequelizeCoursesRepository();
        this.getCoursesUseCase = new GetCoursesUseCase(this.CourseRepository);
        this.createCourseUseCase = new CreateCourseUseCase(this.CourseRepository);
    }

    async createCourse(req, res) {
        try {
        const courseData = req.body;
        const response = await this.createCourseUseCase.execute(courseData);
        res
            .status(201)
            .json(response);
        } catch (error) {
            res
                .status(500)
                .json({message: error.message});
            }
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