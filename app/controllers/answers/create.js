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
import { requestEmbeddingOnAnswer } from 'app/config/flags.json';
import upsertQuestionEmbedding from '../embeddings/create';

const createAnswer = async (body, config = {}) => {
  let allowEmbedding = requestEmbeddingOnAnswer;
  if (config && config.allowEmbedding !== undefined) {
    allowEmbedding = config.allowEmbedding;
  }

  const { error, value } = createAnswerSchema.validate(body);

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.message },
    };
  }

  const { answered_by_employee_id, answered_question_id, ...rest } = value;

  const answer = await db.answers.create({
    data: {
      ...rest,
      answer_text: sanitizeHTML(value.answer_text),
      answer_date: moment.utc().format(DATE_TIME_FORMAT),
      answeredby: {
        connect: {
          employee_id: answered_by_employee_id,
        },
      },
      question: {
        connect: {
          question_id: answered_question_id,
        },
      },
    },
  });

  const relatedQuestion = await db.questions.findUnique({
    where: {
      question_id: answer.answered_question_id,
    },
  });

  await slack.createAnswerNotification({
    questionId: relatedQuestion.question_id,
    questionBody: stripNewLines(relatedQuestion.question),
    answerBody: answer.answer_text,
  });

  if (allowEmbedding) {
  // Purposely we do not await so it is run on the background optimistically
    upsertQuestionEmbedding(relatedQuestion.answered_question_id, answer.answer_text);
  }

  return {
    successMessage: 'The answer was submitted successfully.',
    answer,
  };
};

export default createAnswer;
