require('dotenv').config();

module.exports = {
  PAYMENT_API_ENDPOINT: process.env.PAYMENT_GATEWAY_API_ENDPOINT,
  PAYMENT_API_KEY: process.env.PAYMENT_GATEWAY_API_KEY,
};
