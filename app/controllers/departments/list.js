import { db } from '../../utils/db.server';

const listDepartments = async () => {
  const departments = await db.Departments.findMany({});
  return departments;
};

export default listDepartments;
