const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateAppointmentUseCase {
    constructor(appointmentRepository, getAppointmentUseCase) {
        this.appointmentRepository = appointmentRepository;
        this.getAppointmentUseCase = getAppointmentUseCase;
    }

    async updateAppointment(appointmentData) {
        const response = new Response();

        try {
        let appointmentInserted = await this.getAppointmentUseCase.findById(appointmentData.prlId);
        if (!appointmentInserted.data) {
            throw new Error('appointment not found');
        }

        let appointmentUpdated = await this.appointmentRepository.update(appointmentData.prlId, appointmentData)
        if (!appointmentUpdated) {
            throw new Error('appointment failed update');
        }

        response.code = '200';
        response.status = 'success';
        response.message = 'appointment Updated';
        response.data = appointmentUpdated;
        } catch (error) {
        response.code = '400';
        response.status = 'failed';
        response.message = 'failed update appointment';
        response.error = error;      
        }
        return response;
    }
}

module.exports = UpdateAppointmentUseCase;