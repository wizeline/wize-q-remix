import updateComment from 'app/controllers/comments/update';
import randomAccessToken from 'tests/utils';

import { db } from 'app/utils/db.server';

describe('update comment controller', () => {
  const dbUpdateManyCommentSpy = jest.spyOn(db.comments, 'updateMany');

  it('returns an error when provided invalid comment content', async () => {
    const updateCommentBody = {
      commentid: 11,
      comment: '',
      accessToken: randomAccessToken(),
      useremail: 'miguel.cardona@wizeline.com',
    };

    const updateCommentResponse = await updateComment(updateCommentBody);
    expect(updateCommentResponse).toBeDefined();
    expect(updateCommentResponse.errors).toBeDefined();
    expect(updateCommentResponse.errors[0].message).toBe('The provided parameters for the operation are not valid');
    expect(updateCommentResponse.errors[0].detail.toString()).toContain('comment');
    expect(dbUpdateManyCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('returns an error when provided invalid user email', async () => {
    const updateCommentBody = {
      commentid: 11,
      comment: 'New comment content for test',
      accessToken: randomAccessToken(),
      useremail: 'test',
    };

    const updateCommentResponse = await updateComment(updateCommentBody);
    expect(updateCommentResponse).toBeDefined();
    expect(updateCommentResponse.errors).toBeDefined();
    expect(updateCommentResponse.errors[0].message).toBe('The provided parameters for the operation are not valid');
    expect(updateCommentResponse.errors[0].detail.toString()).toContain('useremail');
    expect(dbUpdateManyCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('returns an error when provided user email does not match with the comment author', async () => {
    const updateCommentBody = {
      commentid: 11,
      comment: 'New comment content for test',
      accessToken: randomAccessToken(),
      useremail: 'will.smith@wizeline.com',
    };

    const updateCommentResponse = await updateComment(updateCommentBody);
    expect(updateCommentResponse).toBeDefined();
    expect(updateCommentResponse.error).toBeDefined();
    expect(updateCommentResponse.error.message).toBe('Error trying to update the comment');
    expect(updateCommentResponse.error.detail).toBe('Comment not found or user does not have edit rights over the comment');
    expect(dbUpdateManyCommentSpy).toHaveBeenCalledTimes(1);
  });

  it('returns an error when provided matching session hash but creation date is out of allowed range', async () => {
    const updateCommentBody = {
      commentid: 12,
      comment: 'New comment content for test',
      accessToken: '8b1a5ca556d49fc46c169b2c94a058065d566f01bb208519cffd2d7419f4ff8cb4d63a060019e86354708c55766a60a2449edff151bb34681d4012699ebc3b22',
      useremail: 'ignacio.canipa@wizeline.com',
    };

    const updateCommentResponse = await updateComment(updateCommentBody);
    expect(updateCommentResponse).toBeDefined();
    expect(updateCommentResponse.error).toBeDefined();
    expect(updateCommentResponse.error.message).toBe('Error trying to update the comment');
    expect(updateCommentResponse.error.detail).toBe('Comment not found or user does not have edit rights over the comment');
    expect(dbUpdateManyCommentSpy).toHaveBeenCalledTimes(2);
  });

  it('updates authored comment when provided correct parameters', async () => {
    const updateCommentBody = {
      commentid: 11,
      comment: 'New comment content, testing the update',
      accessToken: randomAccessToken(),
      useremail: 'miguel.cardona@wizeline.com',
    };

    const updateCommentResponse = await updateComment(updateCommentBody);
    expect(updateCommentResponse).toBeDefined();
    expect(updateCommentResponse.error).toBeUndefined();
    expect(updateCommentResponse.successMessage).toBeDefined();
    expect(dbUpdateManyCommentSpy).toHaveBeenCalledTimes(3);
  });
});
