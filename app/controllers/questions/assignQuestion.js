/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { assignQuestionSchema } from 'app/utils/backend/validators/question';
import { QUESTION_NOT_FOUND_ERROR_MESSAGE } from 'app/utils/constants';
import { db } from 'app/utils/db.server';

const assignQuestion = async (query) => {
  const { error, value } = assignQuestionSchema.validate(query);
  const { question_id, assigned_department, assigned_to_employee_id } = value;

  if (error) {
    return { errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const assignedQuestion = await db.Questions.update({
      where: { question_id },
      data: {
        assigned_department,
        assigned_to_employee_id,
      },
    });

    return {
      successMessage: 'The question department has been reassigned successfully',
      assignedQuestion,
    };
  } catch (_error) {
    return {
      error: {
        message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default assignQuestion;
