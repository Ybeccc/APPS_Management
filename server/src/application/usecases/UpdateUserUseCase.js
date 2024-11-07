const { response } = require('express');
const Response = require('../../domain/entities/Response');

class UpdateUserUseCase {
    constructor(userRepository, getUserUseCase) {
        this.userRepository = userRepository;
        this.getUserUseCase = getUserUseCase;
    }
    
    async updateUser(userData) {
        const response = new Response();

        try {
        let userInserted = await this.getUserUseCase.findById(userData.usrId);
        if (!userInserted.data) {
            throw new Error('User not found');
        }

        let userUpdated = await this.userRepository.update(userData.usrId, userData)
        if (!userUpdated) {
            throw new Error('User failed update');
        }

        response.code = '200';
        response.status = 'success';
        response.message = 'User Updated';
        response.data = userUpdated;
        } catch (error) {
        response.code = '400';
        response.status = 'failed';
        response.message = 'failed update user';
        response.error = error.message;      
    }
        return response;
    }
}

module.exports = UpdateUserUseCase;