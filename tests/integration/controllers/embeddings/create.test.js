import upsertQuestionEmbedding from 'app/controllers/embeddings/create';
import { requestEmbedding } from 'app/utils/openai';
import testEmbedding from './testEmbedding';

jest.mock('app/utils/openai');

describe('upsertQuestionEmbedding', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns undefined if openai data returns empty', async () => {
    requestEmbedding.mockReturnValue({});
    const response = await upsertQuestionEmbedding(1, 'This is a test answer');
    expect(response).toBeUndefined();
  });

  it('returns undefined if openai data array defined but empty', async () => {
    requestEmbedding.mockReturnValue({ data: [] });
    const response = await upsertQuestionEmbedding(1, 'This is a test answer');
    expect(response).toBeUndefined();
  });

  it('returns embedding record if openai data array defined', async () => {
    requestEmbedding.mockReturnValue({
      data: [
        { embedding: testEmbedding }],
    });
    const response = await upsertQuestionEmbedding(1, 'This is a test answer');
    expect(response).toBeDefined();
    expect(response).toEqual(1);
  });
});
