const dotenv = require('./dotenvLoad');
const { initializeDB } = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 8080;

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
