const GetApplicantUseCase = require('../../application/usecases/GetApplicantUseCase');
const SequelizeApplicantRepository = require('../../interface_adapters/repositories/SequelizeApplicantRepository');

class ApplicantController {
    constructor() {
        const applicantRepository = new SequelizeApplicantRepository();
        this.getApplicantUseCase = new GetApplicantUseCase(applicantRepository);
    }

    async getAll(req, res) {
        try {
            const applicants = await this.getApplicantUseCase.getAll();
            res.status(200).json({ data: applicants });
        } catch (error) {
            console.error('Error retrieving applicants:', error);
            res.status(500).json({ message: 'Failed to retrieve applicants', error: error.message });
        }
    }
}

module.exports = ApplicantController;