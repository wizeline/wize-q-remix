import { db } from '../../utils/db.server';

export const listDepartments = async () => {
  const departments = await db.Departments.findMany({});
  return departments;
};
