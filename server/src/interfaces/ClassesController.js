const { response } = require('express');
const GetClassesUseCase = require('../application/GetClassesUseCase');
const SequelizeClassesRepository = require('../interface_adapters/SequelizeClassesRepository');

class ClassesController {
    constructor() {
        this.ClassRepository = new SequelizeClassesRepository();
        this.getClassesUseCase = new GetClassesUseCase(this.ClassRepository);
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
            .json(response);
        }
    }
}

module.exports = ClassesController;