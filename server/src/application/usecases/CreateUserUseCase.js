const { response } = require('express');
const Response = require('../../domain/entities/Response');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = {
      usrRoleId: userData.usrRoleId,
      usrFullName: userData.usrFullName,
      usrUsername: userData.usrUsername,
      usrPassword: userData.usrPassword,
      usrNim: userData.usrNim,
      usrBankAccount: userData.usrBankAccount,
      usrBankAccountNumber: userData.usrBankAccountNumber,
      usrStatus: userData.usrStatus,
      usrCreatedBy: userData.usrCreatedBy,
    };

    const response = new Response();

    try {
      let CreatedUser = await this.userRepository.create(user);
      if (!CreatedUser) {
        throw new Error('User not found');
      }
      response.code = '200';
      response.status = 'success';
      response.message = 'User Created';
      response.data = CreatedUser;
    } catch (error) {
      response.code = '400';
      response.status = 'failed';
      response.message = 'failed create user';
      response.error = error;      
    }
    return response;
  }
}

module.exports = CreateUserUseCase;