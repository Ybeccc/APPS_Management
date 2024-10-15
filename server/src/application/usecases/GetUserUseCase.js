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
          let users = await this.userRepository.getByRoleId(3);
          
          const practicumAssistants = users.map(user => {
              const pcourse = user.Appointment
                  ? user.Appointment.map(app => app.ClassCourse).join(', ')
                  : null;
  
              return {
                  usrFullName: user.usrFullName,
                  usrNim: user.usrNim,
                  pcourse: pcourse
              };
          });
  
          response.code = '200';
          response.status = 'success';
          response.message = 'Practicum assistants found';
          response.data = practicumAssistants;
      } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'Practicum assistants not found';
          response.error = error;
      }
      return response;
  }
  
  async listStudentAst() {
      const response = new Response();
      try {
          let users = await this.userRepository.getByRoleId(4);
  
          const studentAssistants = users.map(user => {
              const pcourse = user.Appointment
                  ? user.Appointment.map(app => app.ClassCourse).join(', ')
                  : null;
  
              return {
                  usrFullName: user.usrFullName,
                  usrNim: user.usrNim,
                  pcourse: pcourse
              };
          });
  
          response.code = '200';
          response.status = 'success';
          response.message = 'Student assistants found';
          response.data = studentAssistants;
      } catch (error) {
          response.code = '400';
          response.status = 'failed';
          response.message = 'Student assistants not found';
          response.error = error;
      }
      return response;
    }
  
  }
  
module.exports = GetUserUseCase;