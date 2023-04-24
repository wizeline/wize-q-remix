/* eslint-disable camelcase */
import { db } from 'app/utils/db.server';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/backend/constants';

const updateDepartement = async (params) => {
  const {
    department_id, name, is_active, ManagerDepartmet,
  } = params;

  if (typeof department_id !== 'number') {
    return {
      errors: [{
        message: DEFAULT_ERROR_MESSAGE,
        detail: 'department_id is not a number',
      },
      ],
    };
  }

  const updatedDepartment = await db.departments.update({
    where: { department_id },
    data: {
      name,
      is_active,
      manager_employee_id: ManagerDepartmet.employee_id,
    },
  });

  return {
    successMessage: 'The department has been updated succesfully',
    updatedDepartment,
  };
};

export default updateDepartement;
