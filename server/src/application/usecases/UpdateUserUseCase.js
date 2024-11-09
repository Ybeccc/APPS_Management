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

    async updateUserStatus(usrId, status) {
        const response = new Response();

        try {
        let userInserted = await this.getUserUseCase.findById(usrId);
        if (!userInserted.data) {
            throw new Error('User not found');
        }

        if(userInserted.data.usrStatus === status){
            throw new Error('Status Already Changed');
        }

        const userObject = {
            usrId: userInserted.data.usrId,
            usrRoleId: userInserted.data.usrRoleId,
            usrFullName: userInserted.data.usrFullName,
            usrUsername: userInserted.data.usrUsername,
            usrPassword: userInserted.data.usrPassword,
            usrNim: userInserted.data.usrNim,
            usrBankAccount: userInserted.data.usrBankAccount,
            usrBankAccountNumber: userInserted.data.usrBankAccountNumber,
            usrStatus: status,
            usrCreatedBy: userInserted.data.usrCreatedBy,
            usrCreatedAt: userInserted.data.usrCreatedAt
          };

        let userUpdated = await this.userRepository.update(usrId, userObject)
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