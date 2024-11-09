const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateCourseUseCase {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseData) {
        const course = {
            crsCourseName: courseData.crsCourseName,
            crsCode: courseData.crsCode,
        };

        const response = new Response();

        try {
            let CreatedCourse = await this.courseRepository.create(course);
            if (!CreatedCourse) {
            throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'course Created';
            response.data = CreatedCourse;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create course';
            response.error = error.message;      
        }

    return response;
    }
}
 
module.exports = CreateCourseUseCase