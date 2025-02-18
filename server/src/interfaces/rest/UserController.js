const { response } = require('express');
const CreateUserUseCase = require('../../application/usecases/CreateUserUseCase');
const GetUserUseCase = require('../../application/usecases/GetUserUseCase');
const UpdateUserUseCase = require("../../application/usecases/UpdateUserUseCase")
const SequelizeUserRepository = require('../../interface_adapters/repositories/SequelizeUserRepository');

class UserController {
  constructor() {
    this.userRepository = new SequelizeUserRepository();
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository, this.getUserUseCase);
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const response = await this.createUserUseCase.execute(userData);
      res
        .status(201)
        .json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
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
        .json({message: error.message});
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
        .json({message: error.message});
      }
  }

  async listPracticumAst(req, res) {
    try {
      const response = await this.getUserUseCase.listPracticumAst();
      res.status(200).json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
    }
  }

  async listStudentAst(req, res) {
    try {
      const response = await this.getUserUseCase.listStudentAst();
      res.status(200).json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id
      const userData = req.body;

      let userInserted = await this.getUserUseCase.findById(userId);
        if (!userInserted.data) {
            throw new Error('User not found');
        }

      const response = await this.updateUserUseCase.updateUser(userId, userData);
      res
        .status(201)
        .json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
    }
  }

  async updateUserStatus(req, res) {
    try {
      const status = req.body.usrStatus;
      const usrId = req.params.id;

      const response = await this.updateUserUseCase.updateUserStatus(usrId,status);
      res
        .status(201)
        .json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
    }
  }

  async updateUserPassword(req, res) {
    try {
      const passwordData = req.body;
      const usrId = req.params.id;

      const response = await this.updateUserUseCase.updateUserPassword(usrId,passwordData);
      res
        .status(201)
        .json(response);
    } catch (error) {
      res.status(500)
      .json({message: error.message});
    }
  }
}

module.exports = UserController;