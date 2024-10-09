const { response } = require('express');
const CreateUserUseCase = require('../../application/usecases/CreateUserUseCase');
const GetUserUseCase = require('../../application/usecases/GetUserUseCase');
const SequelizeUserRepository = require('../../interface_adapters/repositories/SequelizeUserRepository');


class UserController {
  constructor() {
    this.userRepository = new SequelizeUserRepository();
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const response = await this.createUserUseCase.execute(userData);
      res
        .status(201)
        .json(response);
    } catch (error) {
      res.status(500).json(response);
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const response = await this.getUserUseCase.findById(userId);
      res
        .status(200)
        .json(response);
    } catch (error) {
      res
        .status(500)
        .json(response);
    }
  }
  async getAll(req, res) {
    try {
      const response = await this.getUserUseCase.getAll();
      res
        .status(200)
        .json(response);
    } catch (error) {
      res
        .status(500)
        .json(response);
    }
  }
}

module.exports = UserController;