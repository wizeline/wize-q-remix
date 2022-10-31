import Joi from 'joi'
import { JOI_ID_VALIDATION, JOI_SIMPLE_STRING_VALIDATION } from '~/utils/backend/joiConstants';
import { MINIMUM_COMMENT_LENGTH, MAXIMUM_COMMENT_LENGTH } from '~/utils/backend/constants';

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

export const updateCommentSchema = Joi.object().keys({
  commentId: JOI_ID_VALIDATION,
  comment: Joi.string().min(MINIMUM_COMMENT_LENGTH).max(MAXIMUM_COMMENT_LENGTH).required(),
  accessToken: Joi.string().required(),
  userEmail: EMAIL_VALIDATION,
});

export const deleteCommentSchema = Joi.object().keys({
  commentId: JOI_ID_VALIDATION,
  accessToken: Joi.string().required(),
  userEmail: EMAIL_VALIDATION,
});

