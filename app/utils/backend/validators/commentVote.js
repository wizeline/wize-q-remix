import Joi from 'joi';
import { JOI_ID_VALIDATION } from 'app/utils/backend/joiConstants';

export const commentVoteExistsSchema = Joi.object().keys({
  comment_id: JOI_ID_VALIDATION,
  user: Joi.string().required(),
});

export const commentVoteSchema = Joi.object().keys({
  comment_id: JOI_ID_VALIDATION,
  user: Joi.string().required(),
  value: Joi.number().integer().required().min(-1)
    .max(1),
});
