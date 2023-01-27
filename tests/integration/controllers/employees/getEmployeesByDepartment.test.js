import listEmployees from 'app/controllers/employees/list';

describe('list employees by department controller', () => {
  it('returns list of employees if valid department id passed', async () => {
    const expected = [
      {
        employee_id: 1,
        full_name: 'Patrick Shu',
      },
      {
        employee_id: 2,
        full_name: 'John Doe',
      },
    ];

    const employees = await listEmployees(1);
    expect(employees).toBeDefined();
    expect(employees).toEqual(expected);
  });

  it('returns empty list employees if department has no employees', async () => {
    const expected = [];

    const employees = await listEmployees(99);
    expect(employees).toBeDefined();
    expect(employees).toEqual(expected);
  });
});
