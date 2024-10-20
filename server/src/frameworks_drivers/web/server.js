const express = require('express');
const cors = require("cors");
const session = require("express-session");
const routes = require('./routes');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelizeDatabase = require('../../config/Database'); // Ensure this is correctly configured

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));

    // Initialize session middleware with Sequelize store
    this.app.use(session({
      secret: 'your-secret-key',
      store: new SequelizeStore({ db: sequelizeDatabase.getConnection() }),
      resave: false,
      saveUninitialized: false,
      cookie: { 
        secure: false, // Set true only in production with HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour session
      }
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
