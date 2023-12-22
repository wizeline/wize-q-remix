import { db } from 'app/utils/db.server';
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE, PUBLISH_QUESTION_ERROR_MESSAGE } from 'app/utils/constants';
import slack from 'app/utils/slack/slackNotifications';
import { stripNewLines, truncate } from 'app/utils/strings/stringUtils';
import { SLACK_QUESTION_LIMIT } from 'app/utils/slack/slackConstants';

const publishQuestion = async (questionId) => {
  if (typeof questionId !== 'number'
        || questionId === undefined
        || questionId < 1) {
    return {
      error: {
        message: PUBLISH_QUESTION_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
      },
    };
  }
  try {
    const updatedQuestion = await db.questions.update({
      where: { question_id: questionId },
      data: { is_public: true },
    });

    await slack.createQuestionNotification({
      questionBody: stripNewLines(truncate(updatedQuestion.question), SLACK_QUESTION_LIMIT),
      questionId: updatedQuestion.question_id,
      is_public: true,
    });

    return {
      successMessage: 'The question has been published',
      question: updatedQuestion,
    };
  } catch (error) {
    return {
      error: {
        message: PUBLISH_QUESTION_ERROR_MESSAGE,
        detail: error,
      },
    };
  }
};

export default publishQuestion;
