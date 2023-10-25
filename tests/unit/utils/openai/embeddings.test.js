const { EMBEDDINGS_MODEL } = require('app/utils/constants');
const { requestEmbedding } = require('app/utils/openai');

describe('requestEmbedding', () => {
  const prompts = ['Prompt 1', 'Prompt 2'];

  it('returns empty object when openai instance is not defined', async () => {
    const results = await requestEmbedding(undefined, prompts);
    expect(results).toBeUndefined();
  });

  it('calls openai with prompts and established model', async () => {
    const mockResult = [];
    const mockCall = jest.fn(() => mockResult);
    const instance = {
      embeddings: {
        create: mockCall,
      },
    };
    const results = await requestEmbedding(instance, prompts);

    expect(results).toBeDefined();
    expect(mockCall).toBeCalledWith(expect.objectContaining({
      model: EMBEDDINGS_MODEL,
      input: prompts,
    }));
    expect(results).toEqual(mockResult);
  });
});
