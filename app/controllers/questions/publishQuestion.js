import { db } from 'app/utils/db.server';
import { PIN_QUESTION_ERROR_MESSAGE, INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE } from 'app/utils/constants';

const publish = async (questionId) => {
  if (typeof questionId !== 'number'
        || questionId === undefined
        || questionId < 1) {
    return {
      error: {
        message: PIN_QUESTION_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
      },
    };
  }
  try {
    const updatedQuestion = await db.Questions.update({
      where: { question_id: questionId },
      data: { is_public: true },
    });

    return {
      successMessage: 'The questions has been published',
      question: updatedQuestion,
    };
  } catch (error) {
    return {
      error: {
        message: 'publishQuestiosn.js error',
        detail: error,
      },
    };
  }
};

export default publish;
