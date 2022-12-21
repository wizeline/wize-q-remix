import { db } from 'app/utils/db.server';

const listEmployees = async (id) => {
  const employees = await db.$queryRaw`
    SELECT u.employee_id, u.email, u.full_name as 'name' FROM EmployeesDepartments as e
    JOIN users as u ON  e.employee_id = u.employee_id
    WHERE e.department_id = ${id}
    `;
  return employees;
};

export default listEmployees;
