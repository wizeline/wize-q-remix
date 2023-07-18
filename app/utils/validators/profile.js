import Joi from 'joi';
import { JOI_ID_VALIDATION } from 'app/utils/validators/joiConstants';

export const profileQuestionsCreatedSchema = Joi.object().keys({
  employee_id: JOI_ID_VALIDATION,
});

export const profileQuestionsAnsweredSchema = Joi.object().keys({
  employee_id: JOI_ID_VALIDATION,
});
