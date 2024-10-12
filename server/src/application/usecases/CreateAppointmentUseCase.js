const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    async execute(appointmentData) {
        const appointment = {
            aptUsrId: appointmentData.aptUsrId,
            aptCcId: appointmentData.aptCcId,
        };

        const response = new Response();

        try {
            let CreatedAppointment = await this.appointmentRepository.create(appointment);
            if (!CreatedAppointment) {
            throw new Error('Appointment not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'Appointment Created';
            response.data = CreatedAppointment;
        } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'failed create Appointment';
            response.error = error;      
        }

    return response;
    }
}
 
module.exports = CreateAppointmentUseCase