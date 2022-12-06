import assignQuestion from '../../../../app/controllers/questions/assignQuestion';

describe('assignQuestion', () => {
  it('assign question correctly', async () => {
    const payload = {
      question_id: 4,
      assigned_department: 4,
    };

    const response = await assignQuestion(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.assignedQuestion.assigned_department).toEqual(payload.assigned_department);
  });

  it('returns an error when the question is not found', async () => {
    const errPayload = {
      question_id: 11,
      assigned_department: 4,
    };

    const response = await assignQuestion(errPayload);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBe('The question with the id provided could not be found');
    expect(response.error.detail).toBe('The question with the id provided could not be found');
  });
});
