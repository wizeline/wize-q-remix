import Joi from 'joi';
import { JOI_ID_VALIDATION } from 'app/utils/backend/joiConstants';

export const createNPSSchema = Joi.object({
  answer_id: JOI_ID_VALIDATION,
  score: Joi.number().integer(),
  user: Joi.object(),
  accessToken: Joi.string(),
});

export const deleteNPSSchema = Joi.object({
  id: Joi.number().integer(),
  user: Joi.object(),
});
