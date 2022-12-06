import Joi from 'joi';
import { JOI_ID_VALIDATION } from '../joiConstants';

export const updateUserSchema = Joi.object({
  employee_id: JOI_ID_VALIDATION,
  job_title: Joi.string().max(255).allow(''),
  is_admin: Joi.boolean(),
});
