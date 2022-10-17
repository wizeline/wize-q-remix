import { DEFAULT_ERROR_MESSAGE } from '~/utils/backend/constants';
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

  const date = new Date('October 17, 2022 03:24:00');

  let created = await db.Answers.create({
    data: {
      ...rest,
      answer_text: sanitizeHTML(value.answer_text),
      answer_date: date,
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
    answer: created,
  };
};
