import Joi from 'joi';
import { MINIMUM_COMMENT_LENGTH } from 'app/utils/backend/constants';
import { JOI_EMAIL_VALIDATION, JOI_ID_VALIDATION } from 'app/utils/backend/joiConstants';
import { MAXIMUM_COMMENT_LENGTH } from 'app/utils/constants';

const COMMENT_VALIDATION = Joi.string()
  .min(MINIMUM_COMMENT_LENGTH)
  .max(MAXIMUM_COMMENT_LENGTH)
  .required();

const createCommentSchema = Joi.object().keys({
  questionId: JOI_ID_VALIDATION,
  comment: COMMENT_VALIDATION,
  isAnonymous: Joi.boolean(),
  user: Joi.object({
    accessToken: Joi.string().required(),
    userEmail: JOI_EMAIL_VALIDATION,
    userName: Joi.string(),
  }),
});

export default createCommentSchema;
