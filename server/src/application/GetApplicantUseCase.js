const Response = require('../domain/entities/Response');

class GetApplicantUseCase {
    constructor(applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    async getAll() {
        const response = new Response();
        try {
            let ApplicantAll = await this.applicantRepository.getAll();
            if (!ApplicantAll) {
                throw new Error('Applicant not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Applicant found';
            response.data = ApplicantAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'Applicant not found';
            response.error = error;      
          }
        return response;
    }

}

module.exports = GetApplicantUseCase