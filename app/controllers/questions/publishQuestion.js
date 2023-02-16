import { db } from 'app/utils/db.server';
import { PIN_QUESTION_ERROR_MESSAGE, INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE, PUBLISH_QUESTION_ERROR_MESSAE } from 'app/utils/constants';
import slack from 'app/utils/backend/slackNotifications';
import { stripNewLines, truncate } from 'app/utils/backend/stringUtils';
import { SLACK_QUESTION_LIMIT } from 'app/utils/backend/slackConstants';

const publishQuestion = async (questionId) => {
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

    await slack.createQuestionNotification({
      questionBody: stripNewLines(truncate(updatedQuestion.question), SLACK_QUESTION_LIMIT),
      questionId: updatedQuestion.question_id,
    });

    return {
      successMessage: 'The question has been published',
      question: updatedQuestion,
    };
  } catch (error) {
    return {
      error: {
        message: PUBLISH_QUESTION_ERROR_MESSAE,
        detail: PUBLISH_QUESTION_ERROR_MESSAE,
      },
    };
  }
};

export default publishQuestion;
