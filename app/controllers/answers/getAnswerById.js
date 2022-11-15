import { DEFAULT_ERROR_MESSAGE } from '~/utils/backend/constants';
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE } from '~/utils/constants';
import { db } from '~/utils/db.server';

export const getAnswerById = async (answerId, user) => {
  if (!answerId || typeof answerId !== 'number' || parseInt(answerId) < 1) {
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
      successMessage: 'Answer successfully read!',
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
