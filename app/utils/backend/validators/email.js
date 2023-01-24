import Joi from 'joi';

export const sendEmailSchema = Joi.object().keys({
  subject: Joi.string().required(),
  to: Joi.string().required(),
  template: Joi.string().required(),
  context: Joi.object(),
});

export default sendEmailSchema;
