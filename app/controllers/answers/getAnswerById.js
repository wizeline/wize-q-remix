import { DEFAULT_ERROR_MESSAGE, INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE } from 'app/utils/constants';
import { db } from 'app/utils/db.server';

const getAnswerById = async (answerId, user) => {
  if (!answerId || typeof answerId !== 'number' || parseInt(answerId, 10) < 1) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The answer id must be an integer not minor to 1',
      },
    };
  }

  if (!user) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'Please provide the user object',
      },
    };
  }

  try {
    const answer = await db.Answers.findUniqueOrThrow({
      where: { answer_id: answerId },
    });

    return {
      answer,
    };
  } catch (error) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: DEFAULT_ERROR_MESSAGE,
      },
    };
  }
};

export default getAnswerById;
