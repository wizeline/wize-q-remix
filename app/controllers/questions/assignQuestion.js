/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from '../../utils/backend/constants';
import { assignQuestionSchema } from '../../utils/backend/validators/question';
import { QUESTION_NOT_FOUND_ERROR_MESSAGE } from '../../utils/constants';
import { db } from '../../utils/db.server';

const assignQuestion = async (query) => {
  const { error, value } = assignQuestionSchema.validate(query);
  const { question_id, assigned_department } = value;

  if (error) {
    return { errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const assignedQuestion = await db.Questions.update({
      where: { question_id },
      data: {
        assigned_department,
      },
    });

    return {
      successMessage: 'Department has been assigned successfully',
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
