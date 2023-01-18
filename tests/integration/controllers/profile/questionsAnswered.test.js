import questionsAnswered from 'app/controllers/profile/questionsAnswered';

describe('get questions answered', () => {
  it('get questions answered succesfully', async () => {
    const payload = {
      employee_id: 2,
    };

    const response = await questionsAnswered(payload);
    expect(response).toBeDefined();
    expect(response.questions).toBeDefined();
    expect(response.questions.length).toBe(2);
  });

  it('returns an error when the User is not found', async () => {
    const errPayload = {
      employee_id: 999,
    };

    const response = await questionsAnswered(errPayload);
    expect(response).toBeDefined();
    expect(response.questions).toBeUndefined();
    expect(response.error).toBeDefined();
  });
});
