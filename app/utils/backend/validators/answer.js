import Joi from 'joi';
import { MAXIMUM_ANSWER_LENGTH, MINIMUM_ANSWER_LENGTH } from '../constants';
import { JOI_ID_VALIDATION } from '../joiConstants';

export const createAnswerSchema = Joi.object().keys({
  answer_text: Joi.string()
    .min(MINIMUM_ANSWER_LENGTH)
    .max(MAXIMUM_ANSWER_LENGTH)
    .required(),
  answered_by_employee_id: JOI_ID_VALIDATION,
  answered_question_id: JOI_ID_VALIDATION,
});

export const updateAnswerSchema = Joi.object().keys({
  answer_id: JOI_ID_VALIDATION,
  answer_text: Joi.string()
    .min(MINIMUM_ANSWER_LENGTH)
    .max(MAXIMUM_ANSWER_LENGTH)
    .required(),
});

export const deleteAnswerSchema = Joi.object().keys({
  answer_id: JOI_ID_VALIDATION,
});

export const npsSchema = Joi.object().keys({
  id: JOI_ID_VALIDATION,
  score: Joi.number().integer().required().min(1).max(5),
});
