/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import { deleteAnswerSchema } from 'app/utils/validators/answer';
import { db } from 'app/utils/db.server';

const deleteAnswer = async (query) => {
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
    successMessage: 'The answer was deleted succesfully.',
  };
};

export default deleteAnswer;
