import { randomAccessToken } from '../../../utils';
import { createComment } from '~/controllers/comments/create';
import { db } from '~/utils/db.server';

describe('createComment', () => {
  const dbCreateSpy = jest.spyOn(db.Comments, 'create');

  it('returns error on invalid parameters', async () => {
    const comment = {
      comment: 'A',
      questionId: 2,
      accessToken: randomAccessToken(),
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.comment).toBeUndefined();

    expect(dbCreateSpy).toHaveBeenCalledTimes(0);
  });


  it('creates valid comment as user', async () => {
    const comment = {
      comment: '_This_ is a **sample** ~~comment~~',
      questionId: 2,
      accessToken: randomAccessToken(),
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.success).toBeDefined();
    expect(response.comment).toBeDefined();

    expect(dbCreateSpy).toHaveBeenCalled();
  });

  it('creates valid comment as anonymous', async () => {
    const comment = {
      comment: '_This_ is a **sample** ~~comment~~',
      questionId: 2,
      accessToken: randomAccessToken(),
      isAnonymous: true,
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.success).toBeDefined();
    expect(response.comment).toBeDefined();

    expect(dbCreateSpy).toHaveBeenCalled();
  });
});
