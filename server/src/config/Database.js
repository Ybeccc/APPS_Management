// config/Database.js
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelizeDatabase = new Sequelize('vacancy-dbs', 'postgres', 'admin', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

sequelizeDatabase.sync()
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch(err => {
        console.error('Database sync error:', err);
    });

// Test the connection
(async () => {
  try {
    await sequelizeDatabase.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Export with getConnection method
module.exports = {
  getConnection: () => sequelizeDatabase,  // Ensures consistent access
};
