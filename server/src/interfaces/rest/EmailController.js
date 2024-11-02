const { response } = require('express');
const SendEmailUseCase = require('../../application/usecases/SendEmailUseCase');

class EmailController {
    constructor() {
        this.sendEmailUseCase = new SendEmailUseCase();
    }

    async sendEmail(req, res) { // Use camelCase for method names
        try {
            const emailData = req.body;
            const response = await this.sendEmailUseCase.send(emailData);

            if (response.code === '200') {
                res.status(200).json(response); // Successful email send
            } else {
                res.status(400).json(response); // Email sending failed
            }
        } catch (error) {
            res.status(500).json({
                code: '500',
                status: 'error',
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
}

module.exports = EmailController