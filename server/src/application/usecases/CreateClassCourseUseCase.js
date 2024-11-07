const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateClassCourseUseCase {
    constructor(classCourseRepository) {
        this.classCourseRepository = classCourseRepository;
    }

    async execute(ccData) {
        const cc = {
            ccCrsId: ccData.ccCrsId,
            ccCssId: ccData.ccCssId
        };

        const response = new Response();

        try {
            let CreatedCC = await this.classCourseRepository.create(cc);
            if (!CreatedCC) {
            throw new Error('classcourse not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'ClassCourse Created';
            response.data = CreatedCC;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create classcourse';
            response.error = error.message;      
        }

    return response;
    }
}
 
module.exports = CreateClassCourseUseCase