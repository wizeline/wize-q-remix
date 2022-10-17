import { DEFAULT_ERROR_MESSAGE } from '~/utils/backend/constants';
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE } from '~/utils/constants';
import { db } from '~/utils/db.server';

export const getAnswerById = async (answerId, user) => {
  if (!user) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'Please provide the user object',
      },
    };
  }

  try {
    const answer = await db.Answers.findUnique({
      where: { answer_id: answerId },
    });
    return {
      success: true,
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
