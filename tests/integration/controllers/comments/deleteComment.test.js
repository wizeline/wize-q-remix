import createComment from 'app/controllers/comments/create';
import deleteComment from 'app/controllers/comments/delete';
import randomAccessToken from 'tests/utils';
import * as commentsUtils from 'app/utils/comments/comments';

import { db } from 'app/utils/db.server';

describe('delete comment controller', () => {
  const dbDeleteManyCommentSpy = jest.spyOn(db.comments, 'deleteMany');

  afterEach(() => {
    dbDeleteManyCommentSpy.mockClear();
  });

  it('returns an error when accessToken is not provided', async () => {
    const deleteCommentBody = {
      commentid: 1001,
      accessToken: null,
      useremail: 'miguel.cardona@wizeline.com',
    };

    const deleteCommentResponse = await deleteComment(deleteCommentBody);
    expect(deleteCommentResponse).toBeDefined();
    expect(deleteCommentResponse.errors).toBeDefined();
    expect(deleteCommentResponse.errors[0].message).toBe('The provided parameters for the operation are not valid');
    expect(deleteCommentResponse.errors[0].detail.toString()).toContain('accessToken');
    expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('returns an error when provided user email does not match with the comment author', async () => {
    const deleteCommentBody = {
      commentid: 11,
      accessToken: randomAccessToken(),
      useremail: 'not.matching@wizeline.com',
    };

    const deleteCommentResponse = await deleteComment(deleteCommentBody);
    expect(deleteCommentResponse).toBeDefined();
    expect(deleteCommentResponse.error).toBeDefined();
    expect(deleteCommentResponse.error.message).toBe('Error trying to delete the comment');
    expect(deleteCommentResponse.error.detail).toContain('Comment not found or user does not have deletion rights over the comment');
    expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
  });

  it('returns an error when session hash matches but createdAt is out of range', async () => {
    const deleteCommentBody = {
      commentid: 12,
      accessToken: '8b1a5ca556d49fc46c169b2c94a058065d566f01bb208519cffd2d7419f4ff8cb4d63a060019e86354708c55766a60a2449edff151bb34681d4012699ebc3b22',
    };

    const deleteCommentResponse = await deleteComment(deleteCommentBody);
    expect(deleteCommentResponse).toBeDefined();
    expect(deleteCommentResponse.error).toBeDefined();
    expect(deleteCommentResponse.error.message).toBe('Error trying to delete the comment');
    expect(deleteCommentResponse.error.detail).toContain('Comment not found or user does not have deletion rights over the comment');
    expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
  });

  it('deletes the comment when author email matches', async () => {
    const createCommentBody = {
      comment: 'Test delete comment controller',
      questionid: 10,
      user: {
        accessToken: randomAccessToken(),
        useremail: 'eduardo.garibo@wizeline.com',
        username: 'Eduardo Mendoza Garibo',
      },
    };

    const deleteCommentBody = {
      commentid: null,
      accessToken: randomAccessToken(),
      useremail: 'eduardo.garibo@wizeline.com',
    };

    const createCommentResponse = await createComment(createCommentBody);

    expect(createCommentResponse.successMessage).toBeDefined();
    expect(createCommentResponse.comment.id).toBeDefined();
    expect(typeof createCommentResponse.comment.id).toBe('number');

    deleteCommentBody.commentid = createCommentResponse.comment.id;

    const deleteCommentResponse = await deleteComment(deleteCommentBody);
    expect(deleteCommentResponse).toBeDefined();
    expect(deleteCommentResponse.successMessage).toBeDefined();
    expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
  });

  it('deletes the comment when author session hash matches', async () => {
    const accessToken = randomAccessToken();
    const generateMinMaxDatesSpy = jest.spyOn(commentsUtils, 'generateMinMaxDates');
    generateMinMaxDatesSpy.mockImplementation(() => ({
      minDate: new Date(1995, 11, 17),
      maxDate: new Date(3000, 11, 17),
    }));

    const createCommentBody = {
      comment: 'Test delete comment controller',
      questionid: 10,
      user: {
        accessToken,
      },
      isAnonymous: true,
    };

    const deleteCommentBody = {
      commentid: null,
      accessToken,
    };

    const createCommentResponse = await createComment(createCommentBody);

    expect(createCommentResponse.successMessage).toBeDefined();
    expect(createCommentResponse.comment.id).toBeDefined();
    expect(typeof createCommentResponse.comment.id).toBe('number');

    deleteCommentBody.commentid = createCommentResponse.comment.id;

    const deleteCommentResponse = await deleteComment(deleteCommentBody);

    expect(generateMinMaxDatesSpy).toHaveBeenCalledTimes(1);
    expect(deleteCommentResponse).toBeDefined();
    expect(deleteCommentResponse.successMessage).toBeDefined();
    expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);

    generateMinMaxDatesSpy.mockRestore();
  });
});
