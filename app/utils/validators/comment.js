import Joi from 'joi';
import { MINIMUM_COMMENT_LENGTH, MAXIMUM_COMMENT_LENGTH } from 'app/utils/constants';
import { JOI_EMAIL_VALIDATION, JOI_ID_VALIDATION } from 'app/utils/validators/joiConstants';

const COMMENT_VALIDATION = Joi.string()
  .min(MINIMUM_COMMENT_LENGTH)
  .max(MAXIMUM_COMMENT_LENGTH)
  .required();

const createCommentSchema = Joi.object().keys({
  questionid: JOI_ID_VALIDATION,
  comment: COMMENT_VALIDATION,
  isAnonymous: Joi.boolean(),
  user: Joi.object({
    accessToken: Joi.string().required(),
    useremail: JOI_EMAIL_VALIDATION,
    username: Joi.string(),
  }),
});

export default createCommentSchema;
