const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateClassUseCase {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }

    async execute(classesData) {
        const classes = {
            cssClassName: classesData.cssClassName,
        };

        const response = new Response();

        try {
            let CreatedClasses = await this.classRepository.create(classes);
            if (!CreatedClasses) {
            throw new Error('class not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'class Created';
            response.data = CreatedClasses;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create class';
            response.error = error.message;      
        }

    return response;
    }
}
 
module.exports = CreateClassUseCase