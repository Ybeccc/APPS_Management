const Response = require('../domain/entities/Response');

class GetCoursesUseCase {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async getAll() {
        const response = new Response();
        try {
            let CoursesAll = await this.courseRepository.getAll();
            if (!CoursesAll) {
                throw new Error('Course not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Course found';
            response.data = CoursesAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'Course not found';
            response.error = error;      
          }
        return response;
    }

}

module.exports = GetCoursesUseCase