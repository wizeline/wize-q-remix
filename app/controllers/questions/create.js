import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import generateSessionIdHash from 'app/utils/backend/crypto';
import slack from 'app/utils/backend/slackNotifications';
import { stripNewLines, truncate } from 'app/utils/backend/stringUtils';
import sanitizeHTML from 'app/utils/backend/sanitizer';
import { createQuestionSchema } from 'app/utils/backend/validators/question';
import { db } from 'app/utils/db.server';
import { SLACK_QUESTION_LIMIT } from 'app/utils/backend/slackConstants';

const createQuestion = async (body) => {
  const { error, value } = createQuestionSchema.validate(body);
  if (error) {
    return {
      errors: [
        {
          message: DEFAULT_ERROR_MESSAGE,
          detail: error,
        },
      ],
    };
  }

  const { accessToken, ...rest } = value;

  let created = await db.Questions.create({
    data: {
      ...rest,
      question: sanitizeHTML(value.question),
    },
  });

  if (value.is_anonymous) {
    const sessionHash = generateSessionIdHash(accessToken, created.question_id);

    created = await db.Questions.update({
      where: {
        question_id: created.question_id,
      },
      data: {
        user_hash: sessionHash,
      },
    });
  }

  await slack.createQuestionNotification({
    questionBody: stripNewLines(truncate(value.question), SLACK_QUESTION_LIMIT),
    questionId: created.question_id,
  });

  return {
    successMessage: 'The question has been created succesfully!',
    question: created,
  };
};

export default createQuestion;
