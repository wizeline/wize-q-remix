import { db } from 'app/utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from 'app/utils/constants';

const addEmployeeToDepartment = async (parms) => {
  const { departmentId, employeeId, email } = parms;
  if (typeof departmentId !== 'number') {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The department id must be an integer to minor to 1',
      },
    };
  }

  if (typeof employeeId !== 'number') {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The employee id must be an integer to minor to 1',
      },
    };
  }

  if (!email) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The email of the user is not valid',
      },
    };
  }

  try {
    const relationCreated = await db.EmployeesDepartments.create({
      data: {
        department_id: departmentId,
        employee_id: employeeId,
        email,
      },
    });

    return {
      successMessage: 'New user added succesfully',
      userDeparment: relationCreated,
    };
  } catch (error) {
    return {
      error: {
        message: 'Error adding the new user to the department',
        detail: error,
      },
    };
  }
};

export default addEmployeeToDepartment;
