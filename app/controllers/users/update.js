/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';
import updateUserSchema from 'app/utils/backend/validators/admin';
import { db } from 'app/utils/db.server';

const updateUser = async (query) => {
  const { error, value } = updateUserSchema.validate(query);
  const { employee_id, is_admin, job_title } = value;

  if (error) {
    return {
      errors: [
        {
          message: DEFAULT_ERROR_MESSAGE,
          detail: error.details,
        },
      ],
    };
  }

  const updatedUser = await db.users.update({
    where: {
      employee_id,
    },
    data: {
      is_admin,
      job_title,
    },
  });

  return {
    successMessage: 'The user has been updated succesfully.',
    updatedUser,
  };
};

export default updateUser;
