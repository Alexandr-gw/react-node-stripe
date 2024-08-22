const dbConfig = require("./config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
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
