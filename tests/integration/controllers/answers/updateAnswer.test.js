import updateAnswer from 'app/controllers/answers/update';
import getFormattedDate from 'app/utils/dates/dateFormat';
import * as upsertQuestionEmbedding from 'app/controllers/embeddings/create';

describe('updateAnswer', () => {
  const embeddingsUpsertSpy = jest.spyOn(upsertQuestionEmbedding, 'default').mockImplementation();

  afterEach(() => {
    embeddingsUpsertSpy.mockClear();
  });

  it('should validate fields', async () => {
    const response = await updateAnswer({});
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();

    expect(embeddingsUpsertSpy).toHaveBeenCalledTimes(0);
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

    expect(embeddingsUpsertSpy).toHaveBeenCalled();
  });

  it('throws error if answer_id not found', async () => {
    const payload = {
      answer_id: 99999,
      answer_text: 'New answer text',
    };
    await expect(updateAnswer(payload)).rejects.toThrowError();

    expect(embeddingsUpsertSpy).toHaveBeenCalledTimes(0);
  });

  it('return the current date in the updatedat field when updating an answer', async () => {
    const payload = {
      answer_id: 1,
      answer_text: 'New answer text',
    };

    const response = await updateAnswer(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(getFormattedDate(response.updatedAnswer.updatedat))
      .toEqual(getFormattedDate(new Date()));

    expect(embeddingsUpsertSpy).toHaveBeenCalled();
  });
});
