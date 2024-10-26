const Response = require('../domain/entities/Response');

class GetClassesUseCase {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }

    async getAll() {
        const response = new Response();
        try {
            let ClassesAll = await this.classRepository.getAll();
            if (!ClassesAll) {
                throw new Error('Class not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Class found';
            response.data = ClassesAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'Class not found';
            response.error = error;      
          }
        return response;
    }

}

module.exports = GetClassesUseCase