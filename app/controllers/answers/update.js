/* eslint-disable camelcase */
import moment from 'moment';
import {
  DATE_TIME_FORMAT,
  DEFAULT_ERROR_MESSAGE,
} from 'app/utils/constants';
import { updateAnswerSchema } from 'app/utils/validators/answer';
import { db } from 'app/utils/db.server';
import { requestEmbeddingOnAnswer } from 'app/config/flags.json';
import upsertQuestionEmbedding from '../embeddings/create';

const updateAnswer = async (query, config = {}) => {
  const { error, value } = updateAnswerSchema.validate(query);
  const { answer_id, answer_text } = value;
  let allowEmbedding = requestEmbeddingOnAnswer;
  if (config && config.allowEmbedding !== undefined) {
    allowEmbedding = config.allowEmbedding;
  }

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  const updatedAnswer = await db.answers.update({
    where: {
      answer_id,
    },
    data: {
      answer_text,
      answer_date: moment.utc().format(DATE_TIME_FORMAT),
      updatedat: moment.utc().format(DATE_TIME_FORMAT),
    },
  });

  if (allowEmbedding) {
  // Purposely we do not await so it is run on the background optimistically
    upsertQuestionEmbedding(updatedAnswer.question_id, updatedAnswer.answer_text);
  }

  return {
    successMessage: 'The answer has been updated succesfully.',
    updatedAnswer,
  };
};

export default updateAnswer;
