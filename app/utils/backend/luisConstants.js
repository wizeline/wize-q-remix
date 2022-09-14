require('dotenv').config();

module.exports = {
  // See Microsoft Language Understanding (LUIS) resource on azure for more details
  ENDPOINT_URL: process.env.LUIS_ENDPOINT_URL,
  APP_ID: process.env.LUIS_APP_ID,
  KEY: process.env.LUIS_KEY,
};
