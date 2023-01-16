import { db } from 'app/utils/db.server';

const listEmployees = async (id) => {
  if (typeof id !== 'number') {
    return [];
  }
  const idValue = parseInt(id, 10);
  const relations = await db.EmployeesDepartments.findMany({
    where: {
      department_id: idValue,
    },
    distinct: ['email'],
    include: {
      users: true,
    },
  });

  return relations.map((rel) => ({ name: rel.users.full_name, id: rel.employee_id }));
};

export default listEmployees;
