import { db } from 'app/utils/db.server';

const listEmployees = async (id) => {
  const idValue = parseInt(id, 10);
  const relations = await db.employeesdepartments.findMany({
    where: {
      department_id: idValue,
      NOT: [
        {
          employee_id: null,
        },
      ],
    },
    distinct: ['email'],
    include: {
      users: true,
    },
  });
  return relations.map((rel) => ({ name: rel.users.full_name, id: rel.employee_id }));
};

export default listEmployees;
