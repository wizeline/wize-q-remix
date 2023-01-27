import { db } from 'app/utils/db.server';

const listEmployees = async (id) => {
  const idValue = parseInt(id, 10);
  const employees = await db.EmployeesDepartments.findMany({
    where: {
      department_id: idValue,
    },
    distinct: ['email'],
    select: {
      users: {
        select: {
          full_name: true,
          employee_id: true,
        },
      },
    },
  });
  const filtered = employees.filter((employee) => employee.users !== null);
  return filtered.map((employee) => employee.users);
};

export default listEmployees;
