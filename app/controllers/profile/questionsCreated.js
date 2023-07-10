/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import { profileQuestionsCreatedSchema } from 'app/utils/validators/profile';
import { db } from 'app/utils/db.server';

const getQuestionsCreated = async (query) => {
  const { error, value } = profileQuestionsCreatedSchema.validate(query);
  const { employee_id } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  try {
    const validUser = await db.users.findUniqueOrThrow({
      where: {
        employee_id,
      },
    });

    return await db.Questions.findMany({
      where: {
        created_by_employee_id: validUser.employee_id,
      },
    });
  } catch (_error) {
    return {
      error: { message: 'The user was not found', detail: 'ID not found' },
    };
  }
};

export default getQuestionsCreated;
