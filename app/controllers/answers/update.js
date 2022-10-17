import {
  DATE_TIME_FORMAT,
  DEFAULT_ERROR_MESSAGE,
} from '~/utils/backend/constants';
import { updateAnswerSchema } from '~/utils/backend/validators/answer';
import { db } from '~/utils/db.server';
import moment from 'moment';

export const updateAnswer = async (query) => {
  const { error, value } = updateAnswerSchema.validate(query);
  const { answer_id, answer_text } = value;

  if (error) {
    return {
      errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }],
    };
  }

  let updatedAnswer = await db.Answers.update({
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
    success: 'Answer has been updated succesfully.',
    updatedAnswer,
  };
};
