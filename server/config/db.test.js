const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize');

const testDb = new Sequelize(dbConfig.test.DB_NAME, dbConfig.test.DB_USER, dbConfig.test.DB_PASSWORD, {
  host: dbConfig.test.DB_HOST,
  dialect: dbConfig.test.DB_dialect,
  logging: false,
  port: dbConfig.test.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = testDb;