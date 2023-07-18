import Joi from 'joi';
import { JOI_ID_VALIDATION } from 'app/utils/validators/joiConstants';

const updateUserSchema = Joi.object({
  employee_id: JOI_ID_VALIDATION,
  job_title: Joi.string().max(255).allow(''),
  is_admin: Joi.boolean(),
});

export default updateUserSchema;
