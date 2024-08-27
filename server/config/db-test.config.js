const dbConfig = require("./db.config");
const Sequelize = require('sequelize');

const testDb = new Sequelize("postgres://postgres:root@localhost:5432/testdb");

// const testDb = new Sequelize ({
//   database: "testdb",
//   username: "postgres",
//   password: "root",
//   host: "localhost",
//   port: 5430,
//   dialect: "postgres",
//   dialectOptions: {
//     socketPath: '/var/run/postgresql/postgres.sock'
//   }
// })

module.exports = testDb;