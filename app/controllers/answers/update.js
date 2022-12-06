/* eslint-disable camelcase */
import moment from 'moment';
import {
  DATE_TIME_FORMAT,
  DEFAULT_ERROR_MESSAGE,
} from '../../utils/backend/constants';
import { updateAnswerSchema } from '../../utils/backend/validators/answer';
import { db } from '~/utils/db.server';

export const updateAnswer = async (query) => {
  const { error, value } = updateAnswerSchema.validate(query);
  const { answer_id, answer_text } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  const updatedAnswer = await db.Answers.update({
    where: {
      answer_id,
    },
    data: {
      answer_text,
      answer_date: moment.utc().format(DATE_TIME_FORMAT),
      updatedAt: moment.utc().format(DATE_TIME_FORMAT),
    },
  });

  return {
    successMessage: 'Answer has been updated succesfully.',
    updatedAnswer,
  };
};
