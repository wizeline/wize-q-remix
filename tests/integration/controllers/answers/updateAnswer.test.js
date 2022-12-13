import updateAnswer from 'app/controllers/answers/update';
import getFormattedDate from 'app/utils/dateFormat';

describe('updateAnswer', () => {
  it('should validate fields', async () => {
    const response = await updateAnswer({});
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
  });

  it('updates answer fields', async () => {
    const payload = {
      answer_id: 1,
      answer_text: 'New answer text',
    };

    const response = await updateAnswer(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();

    expect(response.updatedAnswer.answer_text).toEqual(payload.answer_text);
  });

  it('throws error if answer_id not found', async () => {
    const payload = {
      answer_id: 99999,
      answer_text: 'New answer text',
    };
    await expect(updateAnswer(payload)).rejects.toThrowError();
  });

  it('return the current date in the updatedAt field when updating an answer', async () => {
    const payload = {
      answer_id: 1,
      answer_text: 'New answer text',
    };

    const response = await updateAnswer(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(getFormattedDate(response.updatedAnswer.updatedAt))
      .toEqual(getFormattedDate(new Date()));
  });
});
