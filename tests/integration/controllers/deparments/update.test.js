import updateDepartement from 'app/controllers/departments/update';

describe('updateDepartment', () => {
  it('Add Manager', async () => {
    const payload = {
      department_id: 2,
      name: 'Academy',
      is_active: true,
      ManagerDepartmet: {
        employee_id: 2,
        full_name: 'John Doe',
      },
    };
    const response = await updateDepartement(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.updatedDepartment.manager_employee_id)
      .toEqual(payload.ManagerDepartmet.employee_id);
  });

  it('Add Substiture', async () => {
    const payload = {
      department_id: 2,
      name: 'Academy',
      is_active: true,
      ManagerDepartmet: {
        employee_id: 2,
        full_name: 'John Doe',
      },
      SubstituteManager: {
        employee_id: 3,
        full_name: 'Will Smith',
      },
    };
    const response = await updateDepartement(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.updatedDepartment.alternate_manager_id)
      .toEqual(payload.SubstituteManager.employee_id);
  });
});
