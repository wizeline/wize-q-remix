import deleteAnswer from 'app/controllers/answers/delete';

describe('deleteAnswer', () => {
  it('delete correctly', async () => {
    const payload = {
      answer_id: 1,
    };

    const response = await deleteAnswer(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
  });
});
