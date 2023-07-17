/* eslint-disable camelcase */
import { db } from 'app/utils/db.server';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';

const updateDepartement = async (params) => {
  const {
    department_id, name, is_active, ManagerDepartmet, SubstituteManager,
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
      manager_employee_id: (ManagerDepartmet && ManagerDepartmet.employee_id !== undefined)
        ? ManagerDepartmet.employee_id : null,
      alternate_manager_id: (SubstituteManager && SubstituteManager.employee_id !== undefined)
        ? SubstituteManager.employee_id : null,
    },
  });

  return {
    successMessage: 'The department has been updated succesfully',
    updatedDepartment,
  };
};

export default updateDepartement;
