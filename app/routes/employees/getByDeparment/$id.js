import listEmployees from 'app/controllers/employees/list';

export const loader = async (data) => {
  const { params } = data;
  if (params.id === -1 || params.id === 'undefined') {
    return [];
  }
  const employees = await listEmployees(params.id);
  return { employees };
};

export default loader;
