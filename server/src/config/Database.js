const { Sequelize } = require('sequelize');

class SequelizeDatabase {
  constructor() {
    this.sequelize = new Sequelize('vacancy-dbs', 'postgres', 'admin', {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    });
  }

  getConnection() {
    return this.sequelize;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

const db = new SequelizeDatabase();

// Immediately test the connection here
db.testConnection();

module.exports = db;