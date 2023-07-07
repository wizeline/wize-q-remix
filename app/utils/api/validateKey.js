require('dotenv').config();

const validateKey = (request) => {
  const key = request.headers.get('API_KEY');

  if (!key) {
    return { error: 'API key not provided', valid: false };
  }

  if (process.env.API_KEY && process.env.API_KEY !== key) {
    return { error: 'API key does not match required', valid: false };
  }

  return { valid: true };
};

module.exports = validateKey;
