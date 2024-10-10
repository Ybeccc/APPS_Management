const Response = require('../../domain/entities/Response');

class GetUserUseCase {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async findById(userId) {
        const response = new Response();
        try {
            let UserById = await this.userRepository.findById(userId);
            if (!UserById) {
                throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'User found';
            response.data = UserById;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'user not found';
            response.error = error;      
          }
        return response;
    }

    async getAll() {
        const response = new Response();
        try {
            let UserAll = await this.userRepository.getAll();
            if (!UserAll) {
                throw new Error('User not found');
            }
            response.code = '200';
            response.status = 'success';
            response.message = 'User found';
            response.data = UserAll;
          } catch (error) {
            response.code = '400';
            response.status = 'failed';
            response.message = 'user not found';
            response.error = error;      
          }
        return response;
    }

    async update(userId, updatedData) {
      const response = {};
      try {
          let user = await this.userRepository.findById(userId);
          if (!user) {
              throw new Error('User not found');
          }
          let updatedUser = await user.update(updatedData);
          response.code = '200';
          response.status = 'success';
          response.message = 'User updated';
          response.data = updatedUser;
      } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'User not updated';
          response.error = error.message;
      }
      return response;
    }
  
  }
  
module.exports = GetUserUseCase;