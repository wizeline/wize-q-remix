import Joi from 'joi';
import { JOI_ID_VALIDATION } from '../joiConstants';

const profileQuestionsCreatedSchema = Joi.object().keys({
  employee_id: JOI_ID_VALIDATION,
});

export default profileQuestionsCreatedSchema;
