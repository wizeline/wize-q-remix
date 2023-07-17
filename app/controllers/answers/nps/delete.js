import { deleteNPSSchema } from 'app/utils/validators/nps';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import { db } from 'app/utils/db.server';

const deleteNPS = async (params) => {
  const { error, value } = deleteNPSSchema.validate(params);

  if (error) {
    return {
      errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }],
    };
  }
  const { id, user } = value;
  try {
    await db.Nps.delete({
      where: {
        answer_id_user: {
          answer_id: id,
          user: user.id,
        },
      },
    });

    return {
      successMessage: 'Your answer score was cleared.',
    };
  } catch (errorCatch) {
    return {
      errors: [
        {
          message: 'Something went wrong when resetting the answer score',
          detail: errorCatch,
        },
      ],
    };
  }
};

export default deleteNPS;
