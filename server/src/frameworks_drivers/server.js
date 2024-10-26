const express = require('express');
const cors = require("cors");
const routes = require('./routes');
const sequelizeDatabase = require('../config/Database');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
    }

    initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
        }));
    }

  initializeRoutes() {
    this.app.use(routes); // Use the routes
  }

  start() {
    this.initializeMiddleware();
    this.initializeRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
