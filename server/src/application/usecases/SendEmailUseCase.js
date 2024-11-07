const Response = require('../../domain/entities/Response');
const transporter = require('../../config/Email');
const path = require('path');
const fs = require('fs');

class SendEmailUseCase {    

    async send(emailData) {
        const response = new Response();

        try {
            const htmlTemplatePath = path.join(__dirname, '../..', 'template/email', 'email_example.html');
            const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8').replaceAll('{name}','Fernando');
            const filePath = path.join(__dirname, '../..', 'file', 'CV_FERNANDO.pdf');

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: emailData.receiver, 
                subject: emailData.subject,
                html: htmlTemplate,
                attachments: [
                    {
                      filename: "CV-ayang.pdf",
                      path: filePath
                    },
                  ],
            };

            // Return a promise to handle the asynchronous behavior
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        response.code = '400';
                        response.status = 'failed';
                        response.message = 'Email Failed to Send';
                        response.error = error;
                        return reject(response); // Reject the promise with the response object
                    } else {
                        response.code = '200';
                        response.status = 'success';
                        response.message = 'Email Sent';
                        response.data = info.response;
                        return resolve(response); // Resolve the promise with the response object
                    }
                });
            });

        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'Email Failed to Sent';
            response.error = error;      
            return response; // Return the response in case of errors
        }
    }
}
 
module.exports = SendEmailUseCase;