const { response } = require('express');
const Response = require('../domain/entities/Response');

class CreateApplicantUseCase {
    constructor(applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    async execute(applicantData) {
        const applicant = {
            aplName: applicantData.aplName,
            aplNim: applicantData.aplNim,
            aplEmail: applicantData.aplEmail,
            aplProdi: applicantData.aplProdi,
            aplAkt: applicantData.aplAkt,
            aplCrsId: applicantData.aplCrsId,
        };

        const response = new Response();

        try {
            let CreatedApplicant = await this.applicantRepository.create(applicant);
            if (!CreatedApplicant) {
            throw new Error('Applicant not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Applicant Created';
            response.data = CreatedApplicant;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create Applicant';
            response.error = error;      
        }

    return response;
    }
}
 
module.exports = CreateApplicantUseCase