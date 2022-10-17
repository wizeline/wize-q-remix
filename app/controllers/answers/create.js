import moment from 'moment';
import {
  DATE_TIME_FORMAT,
  DEFAULT_ERROR_MESSAGE,
} from '~/utils/backend/constants';
import { createAnswerSchema } from '~/utils/backend/validators/answer';
import { sanitizeHTML } from '~/utils/backend/sanitizer';
import { db } from '~/utils/db.server';

export const createAnswer = async (body) => {
  const { error, value } = createAnswerSchema.validate(body);

  if (error) {
    return {
      errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.message }],
    };
  }

  const { answered_by_employee_id, answered_question_id, ...rest } = value;

  let answer = await db.Answers.create({
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

  return {
    success: 'Answer has been created succesfully!',
    answer,
  };
};
