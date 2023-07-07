/* eslint-disable camelcase */
import moment from 'moment';
import {
  DATE_TIME_FORMAT,
  DEFAULT_ERROR_MESSAGE,
} from 'app/utils/constants';
import { createAnswerSchema } from 'app/utils/validators/answer';
import sanitizeHTML from 'app/utils/strings/sanitizer';
import { db } from 'app/utils/db.server';
import slack from 'app/utils/slack/slackNotifications';
import { stripNewLines } from 'app/utils/strings/stringUtils';

const createAnswer = async (body) => {
  const { error, value } = createAnswerSchema.validate(body);

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.message },
    };
  }

  const { answered_by_employee_id, answered_question_id, ...rest } = value;

  const answer = await db.Answers.create({
    data: {
      ...rest,
      answer_text: sanitizeHTML(value.answer_text),
      answer_date: moment.utc().format(DATE_TIME_FORMAT),
      AnsweredBy: {
        connect: {
          employee_id: answered_by_employee_id,
        },
      },
      Question: {
        connect: {
          question_id: answered_question_id,
        },
      },
    },
  });

  const relatedQuestion = await db.Questions.findUnique({
    where: {
      question_id: answer.answered_question_id,
    },
  });

  await slack.createAnswerNotification({
    questionId: relatedQuestion.question_id,
    questionBody: stripNewLines(relatedQuestion.question),
    answerBody: answer.answer_text,
  });

  return {
    successMessage: 'The answer was submitted successfully.',
    answer,
  };
};

export default createAnswer;
