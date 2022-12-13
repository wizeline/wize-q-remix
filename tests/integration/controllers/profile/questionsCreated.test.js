import getQuestionsCreated from 'app/controllers/profile/questionsCreated';

describe('get questions created', () => {
  it('send valid employee id', async () => {
    const user = {
      employee_id: 2,
    };
    const response = await getQuestionsCreated(user);
    expect(response).toBeDefined();
    expect(response.length).toBe(4);
  });

  it('send invalid employee id', async () => {
    const user = {
      employee_id: 9999,
    };
    const response = await getQuestionsCreated(user);
    expect(response).toBeDefined();
    expect(response.error.message).toBe('The user was not found');
    expect(response.error.detail).toBe('ID not found');
  });
});
