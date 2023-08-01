import {
  PIN_QUESTION_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from 'app/utils/constants';
import { modifyQuestionPinStatusParams } from 'app/utils/validators/question';
import { db } from 'app/utils/db.server';

const modifyPinStatus = async (questionId, newPinStatus) => {
  const { error, value } = modifyQuestionPinStatusParams.validate({
    questionId,
    newPinStatus,
  });

  if (error) {
    return {
      error: {
        message: PIN_QUESTION_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
      },
    };
  }

  try {
    const updatedQuestion = await db.questions.update({
      where: { question_id: value.questionId },
      data: { is_pinned: value.newPinStatus },
    });
    return {
      successMessage: `The question has been ${updatedQuestion.is_pinned ? 'pinned' : 'unpinned'}.`,
      question: updatedQuestion,
    };
  } catch (_error) {
    return {
      error: {
        message: PIN_QUESTION_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default modifyPinStatus;
