const express = require('express');
const routes = require('./routes'); // Import the routes

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
  }

  initializeMiddleware() {
    this.app.use(express.json());
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