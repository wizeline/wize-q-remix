import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import { npsSchema } from 'app/utils/backend/validators/answer';
import { db } from 'app/utils/db.server';

const nps = async (query) => {
  const { error, value } = npsSchema.validate(query);
  const { id, score } = value;

  if (error) {
    return { errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const scored = await db.Nps.update({
      where: { id },
      data: {
        score,
      },
    });

    return {
      successMessage: 'Score has been assigned successfully',
      scored,
    };
  } catch (errorCatch) {
    return {
      error: {
        message: 'Answer not found',
        detail: 'Answer not found',
      },
    };
  }
};

export default nps;
