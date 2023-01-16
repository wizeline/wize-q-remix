import {
  ENABLE_DISABLE_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from 'app/utils/constants';
import { modifyQuestionEnabledValueParams } from 'app/utils/backend/validators/question';
import { db } from 'app/utils/db.server';

const modifyEnabledValue = async (questionId, enabledValue) => {
  const { error, value } = modifyQuestionEnabledValueParams.validate({
    questionId,
    enabledValue,
  });

  if (error) {
    return {
      error: {
        message: ENABLE_DISABLE_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
      },
    };
  }

  try {
    const updatedQuestion = await db.Questions.update({
      where: { question_id: value.questionId },
      data: { is_enabled: value.enabledValue },
    });
    return {
      successMessage: `The question has been ${
        enabledValue ? 'enabled' : 'disabled'
      }.`,
      question: updatedQuestion,
    };
  } catch (errorCatch) {
    return {
      error: {
        message: ENABLE_DISABLE_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default modifyEnabledValue;
