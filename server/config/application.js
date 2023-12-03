require('dotenv').config();

module.exports = {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 3000,
};
