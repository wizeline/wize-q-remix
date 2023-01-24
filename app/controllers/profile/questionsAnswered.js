import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { profileQuestionsAnsweredSchema } from 'app/utils/backend/validators/profile';
import { db } from 'app/utils/db.server';

const questionsAnswered = async (query) => {
  const { error, value } = profileQuestionsAnsweredSchema.validate(query);
  const { employee_id: employeeId } = value;

  if (error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const userFound = await db.users.findUnique({
      where: {
        employee_id: employeeId,
      },
    });

    if (!userFound) {
      return {
        error: {
          message: 'The provided user was not found',
          detail: `The user with id: ${employeeId} was not found`,
        },
      };
    }

    const questions = await db.Questions.findMany({
      where: {
        Answers: {
          some: {
            answered_by_employee_id: employeeId,
          },
        },
      },
    });

    return { questions };
  } catch (_error) {
    return { error: [{ message: DEFAULT_ERROR_MESSAGE, detail: _error }] };
  }
};

export default questionsAnswered;
