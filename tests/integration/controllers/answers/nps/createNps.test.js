import { randomAccessToken } from '../../../../utils';
import { createNPS } from '../../../../../app/controllers/answers/nps/create';

describe('nps create controller', () => {
  it('add netscore for an answer', async () => {
    const params = {
      answer_id: 2,
      score: 4,
      user: {
        id: 'google-oauth2|104883293456238733099',
      },
      accessToken: randomAccessToken(),
    };

    const response = await createNPS(params);
    expect(response).toBeDefined();
    expect(response.npmCreated).toBeDefined();
  });

  it('error when the answer not exist', async () => {
    const params = {
      answer_id: 2,
      score: 4,
      user: {
        id: 'google-oauth2|104883293456238733099',
      },
      accessToken: randomAccessToken(),
    };

    const response = await createNPS(params);
    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
    expect(response.errors[0].message).toBe('Something went wrong at created the netscore');
  });

  it('error when score is missing', async () => {
    const params = {
      answer_id: 2,
      score: null,
      user: {
        id: 'google-oauth2|104883293456238733099',
      },
      accessToken: randomAccessToken(),
    };
    const response = await createNPS(params);
    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
    expect(response.errors[0].message).toBe('An unknown error has occurred with your request.');
    expect(response.errors[0].detail[0].message).toBe('"score" must be a number');
  });
});
