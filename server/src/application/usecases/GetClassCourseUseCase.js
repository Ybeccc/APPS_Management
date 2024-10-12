const Response = require('../../domain/entities/Response');

class GetClassCourseUseCase {
    constructor(classCourseRepository) {
        this.classCourseRepository = classCourseRepository;
    }

    async findById(payrollId) {
        const response = new Response();
        try {
            let ccById = await this.classCourseRepository.findById(payrollId);
            if (!ccById) {
                throw new Error('classcourse not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'classcourse found';
            response.data = ccById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'classcourse not found';
            response.error = error;      
          }
        return response;
    }

    async getAll() {
        const response = new Response();
        try {
            let ccAll = await this.classCourseRepository.getAll();
            if (!ccAll) {
                throw new Error('classcourse not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'classcourse found';
            response.data = ccAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'classcourse not found';
            response.error = error;      
          }
        return response;
    }

}

module.exports = GetClassCourseUseCase