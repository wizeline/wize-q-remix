import randomAccessToken from 'tests/utils';
import createComment from 'app/controllers/comments/create';
import { db } from 'app/utils/db.server';

describe('createComment', () => {
  const dbCreateSpy = jest.spyOn(db.comments, 'create');
  const dbUpdateSpy = jest.spyOn(db.comments, 'update');

  it('returns error on invalid parameters', async () => {
    const comment = {
      comment: 'A',
      questionid: 2,
      accessToken: randomAccessToken(),
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.comment).toBeUndefined();

    expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    expect(dbCreateSpy).toHaveBeenCalledTimes(0);
  });

  it('creates valid comment as user', async () => {
    const comment = {
      comment: '_This_ is a **sample** ~~comment~~',
      questionid: 2,
      user: {
        accessToken: randomAccessToken(),
        useremail: 'john.doe@wizeline.com',
        username: 'John Doe',
      },
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.comment).toBeDefined();

    expect(response.comment.createdat).toBeDefined();
    expect(response.comment.username).toBeDefined();
    expect(response.comment.createdat).toBeDefined();

    expect(response.comment.sessionhash).toBeNull();

    expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    expect(dbCreateSpy).toHaveBeenCalled();
  });

  it('creates valid comment as anonymous', async () => {
    const comment = {
      comment: '_This_ is a **sample** ~~comment~~',
      questionid: 2,
      user: {
        accessToken: randomAccessToken(),
      },
      isAnonymous: true,
    };

    const response = await createComment(comment);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.comment).toBeDefined();

    expect(response.comment.createdat).toBeDefined();
    expect(response.comment.useremail).toBeNull();
    expect(response.comment.username).toBeNull();
    expect(response.comment.sessionhash).toBeDefined();

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(dbUpdateSpy).toHaveBeenCalled();
  });
});
