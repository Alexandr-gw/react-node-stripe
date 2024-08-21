const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, 
});

async function initializeDB() {
  try {
    await sequelize.authenticate();
    console.log('PG: Connection has been established successfully.');
    await sequelize.sync(); 
    console.log('PG: All models were synchronized successfully.');
  } catch (error) {
    console.error('PG: Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, initializeDB };
