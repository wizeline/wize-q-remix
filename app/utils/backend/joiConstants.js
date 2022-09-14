const Joi = require('joi');

module.exports = {
  JOI_ID_VALIDATION: Joi.number().integer().min(1).required(),
  JOI_SIMPLE_STRING_VALIDATION: Joi.string().required(),
};
