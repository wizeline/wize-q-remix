import taggingComment from 'app/controllers/comments/tags/tagging';

describe('tag a comment controller', () => {
  it('tag a comment', async () => {
    const params = {
      commentId: 13,
      tagId: 1,
      taggedBy: '2',
    };
    const response = await taggingComment(params);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.successMessage).toEqual('The comment was tagged succesfully.');
    expect(response.comment).toBeDefined();
    expect(response.comment.id).toEqual(params.commentId);
    expect(response.comment.tag_id).toEqual(params.tagId);
    expect(response.comment.taggedby).toEqual(params.taggedBy);
  });

  it('removing the tag', async () => {
    const params = {
      commentId: 14,
      tagId: null,
      taggedBy: null,
    };
    const response = await taggingComment(params);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.successMessage).toEqual('The comment was removed succesfully.');
    expect(response.comment).toBeDefined();
    expect(response.comment.id).toEqual(params.commentId);
  });

  it('error not sending commentId ', async () => {
    const response = await taggingComment({ tagId: 1, taggedBy: '2' });
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toEqual('Something went wrong tagging a comment!');
  });

  it('error sending the incorrect datatype comment id', async () => {
    const response = await taggingComment({ commentId: 'abc' });
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toEqual('Something went wrong tagging a comment!');
    expect(response.error.detail).toBeDefined();
    expect(response.error.detail.message).toEqual('"commentId" must be a number');
  });

  it('error comment not found', async () => {
    const response = await taggingComment({ commentId: 20 });
    expect(response).toBeDefined();
    expect(response.error.message).toBeDefined();
    expect(response.error.message).toEqual('Comment not found');
  });

  it('error sending the incorrect datatype tag', async () => {
    const response = await taggingComment({ commentId: 13, tagId: 'null' });
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toEqual('Something went wrong tagging a comment!');
    expect(response.error.detail).toBeDefined();
    expect(response.error.detail.message).toEqual('"tagId" must be a number');
  });
});
