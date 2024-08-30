const dbConfig = require("./config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.development.DB_NAME, dbConfig.development.DB_USER, dbConfig.development.DB_PASSWORD, {
  host: dbConfig.development.DB_HOST,
  dialect: dbConfig.development.dialect,
  logging: false,
  port: dbConfig.development.DB_port,
  pool: {
    max: dbConfig.development.pool.max,
    min: dbConfig.development.pool.min,
    acquire: dbConfig.development.pool.acquire,
    idle: dbConfig.development.pool.idle
  }
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