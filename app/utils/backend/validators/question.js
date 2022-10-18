import { MAXIMUM_QUESTION_LENGTH, MINIMUM_QUESTION_LENGTH } from '~/utils/backend/constants';
import Joi from 'joi';
import { JOI_ID_VALIDATION } from '../joiConstants';

export const createQuestionSchema = Joi.object().keys({
  username: Joi.string().allow(null),
  accessToken: Joi.string().required(),
  question: Joi.string().min(MINIMUM_QUESTION_LENGTH).max(MAXIMUM_QUESTION_LENGTH).required(),
  is_anonymous: Joi.boolean().required(),
  location: Joi.string().required(),
  created_by_employee_id: Joi.number().integer().min(1).allow(null),
  assigned_department: Joi.number().integer().min(1).allow(null),
});

export const modifyQuestionPinStatusParms = Joi.object().keys({
  questionId: Joi.number().integer().required().min(1),
  newPinStatus: Joi.boolean().required(),
});

export const assignQuestionSchema = Joi.object().keys({
  question_id: JOI_ID_VALIDATION,
  assigned_department: JOI_ID_VALIDATION,
});
