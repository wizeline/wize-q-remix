import Joi from 'joi';
import { JOI_ID_VALIDATION } from '../joiConstants';

export const profileQuestionsCreatedSchema = Joi.object().keys({
  employee_id: JOI_ID_VALIDATION,
});
