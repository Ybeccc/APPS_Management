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

    async listPracticumAst() {
      const response = new Response();
      try {
        const users = await this.userRepository.listPracticumAst({
          usrRoleId: 3,  // Ensure correct field is used
        });
  
        if (users.length === 0) {
          throw new Error('No practicum assistants found');
        }
  
        response.code = '200';
        response.status = 'success';
        response.message = 'Practicum assistants found';
        response.data = users;
      } catch (error) {
        console.error('Error fetching practicum assistants:', error);
        response.code = '400';
        response.status = 'failed';
        response.message = 'Practicum assistants not found';
        response.error = error.message;
      }
      return response;
    }
    
    async listStudentAst() {
      const response = new Response();
      try {
        const users = await this.userRepository.listStudentAst({
          usrRoleId: 4,  // Ensure correct field is used
        });
  
        if (users.length === 0) {
          throw new Error('No student assistants found');
        }
  
        response.code = '200';
        response.status = 'success';
        response.message = 'Student assistants found';
        response.data = users;
      } catch (error) {
        console.error('Error fetching student assistants:', error);
        response.code = '400';
        response.status = 'failed';
        response.message = 'Student assistants not found';
        response.error = error.message;
      }
      return response;
    }
  }
  
module.exports = GetUserUseCase;