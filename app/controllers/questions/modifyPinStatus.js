import { PIN_QUESTION_ERROR_MESSAGE, INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE, QUESTION_NOT_FOUND_ERROR_MESSAGE } from "~/utils/constants";
import { modifyQuestionPinStatusParms } from "~/utils/backend/validators/question";
import { db } from "~/utils/db.server";

export const modifyPinStatus = async (questionId, newPinStatus) => {
  const { error, value } = modifyQuestionPinStatusParms.validate({
    questionId,
    newPinStatus,
  });

  if (error) {
    return { 
      error: {
        message: PIN_QUESTION_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE
      }  
    };
  }

  try {
    const updatedQuestion = await db.Questions.update({
      where: { question_id: value.questionId },
      data: { is_pinned: value.newPinStatus },
    });
    return {
      success: `The question has been ${updatedQuestion.is_pinned ? 'pinned' : 'unpinned'}`,
      question: updatedQuestion,
    }

  } catch (error) {
    return { 
      error: {
        message: PIN_QUESTION_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE
      }  
    };
  }

};
