import { db } from 'app/utils/db.server';
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE, DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';

const removeEmployeeToDepartment = async (params) => {
  const { employeeId, departmentId } = params;
  if (typeof employeeId !== 'number' || typeof departmentId !== 'number') {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
      },
    };
  }
  const relationRemoved = await db.EmployeesDepartments.deleteMany({
    where: {
      department_id: departmentId,
      employee_id: employeeId,
    },
  });

  if (
    relationRemoved.count === undefined
    || typeof relationRemoved.count !== 'number'
  ) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: 'Something went wrong',
      },
    };
  }

  if (relationRemoved.count === 0) {
    return {
      error: {
        message: relationRemoved,
        detail:
          'The relation between the employee and the department not found',
      },
    };
  }

  return {
    successMessage: 'The comment was deleted successfully',
  };
};

export default removeEmployeeToDepartment;
