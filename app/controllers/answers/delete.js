/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from '../../utils/backend/constants';
import { deleteAnswerSchema } from '../../utils/backend/validators/answer';
import { db } from '~/utils/db.server';

export const deleteAnswer = async (query) => {
  const { error, value } = deleteAnswerSchema.validate(query);
  const { answer_id } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  // Delete all Nps that have respective answer_id (FK)
  await db.Nps.deleteMany({
    where: {
      answer_id,
    },
  });

  await db.Answers.delete({
    where: {
      answer_id,
    },
  });

  return {
    successMessage: 'Answer has been deleted succesfully.',
  };
};
