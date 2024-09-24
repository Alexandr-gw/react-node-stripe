module.exports = {
  development: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_port: process.env.DB_PORT,
    dialect: "postgres",
    dialectModule: require('pg'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    DB_HOST: process.env.DB_TEST_HOST,
    DB_USER: process.env.DB_TEST_USER,
    DB_PASSWORD: process.env.DB_TEST_PASSWORD,
    DB_NAME: process.env.DB_TEST_NAME,
    DB_port: process.env.DB_TEST_PORT,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};