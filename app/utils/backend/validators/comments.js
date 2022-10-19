import Joi from 'joi'
import { JOI_ID_VALIDATION, JOI_SIMPLE_STRING_VALIDATION } from '~/utils/backend/joiConstants';

const EMAIL_VALIDATION = Joi.string().email().allow(null);
const SIMPLE_INTEGER_VALIDATION = Joi.number().integer();

export const getCommentsSchema = Joi.object().keys({
  questionId: JOI_ID_VALIDATION,
  limit: SIMPLE_INTEGER_VALIDATION,
  offset: SIMPLE_INTEGER_VALIDATION,
  userEmail: EMAIL_VALIDATION,
  sessionToken: JOI_SIMPLE_STRING_VALIDATION,
  userId: JOI_SIMPLE_STRING_VALIDATION,
  sortBy: JOI_SIMPLE_STRING_VALIDATION,
});

