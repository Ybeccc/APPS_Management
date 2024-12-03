const { response } = require('express');
const GetClassesUseCase = require('../../application/usecases/GetClassesUseCase');
const CreateClassUseCase = require('../../application/usecases/CreateClassUseCase');
const SequelizeClassesRepository = require('../../interface_adapters/repositories/SequelizeClassesRepository');

class ClassesController {
    constructor() {
        this.ClassRepository = new SequelizeClassesRepository();
        this.getClassesUseCase = new GetClassesUseCase(this.ClassRepository);
        this.createClassUseCase = new CreateClassUseCase(this.ClassRepository);
    }

    async createClass(req, res) {
        try {
        const classData = req.body;
        const response = await this.createClassUseCase.execute(classData);
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
        const response = await this.getClassesUseCase.getAll();
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