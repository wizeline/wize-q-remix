import { upsertCommentVote } from '~/controllers/commentVotes/voteComment';
import { db } from '~/utils/db.server';

describe('commentVotes', () => {
  const dbFindFirstCommentVoteSpy = jest.spyOn(db.CommentVote, 'findFirst');
  const dbUpdateCommentVoteSpy = jest.spyOn(db.CommentVote, 'update');
  const dbCreateCommentVoteSpy = jest.spyOn(db.CommentVote, 'create');

  it('creates vote', async () => {
    const payload = {
      comment_id: 1,
      user: 'google-oauth2|100361217454991890939',
      value: -1,
    };
    const response = await upsertCommentVote(payload);
    expect(response).toBeDefined();
    expect(response.commentVote.value).toBe(-1);
    expect(dbFindFirstCommentVoteSpy).toHaveBeenCalledTimes(1);
    expect(dbUpdateCommentVoteSpy).toHaveBeenCalledTimes(0);
    expect(dbCreateCommentVoteSpy).toHaveBeenCalledTimes(1);
  });

  it('sends same current value (Up)', async () => {
    const payload = {
      comment_id: 10,
      user: 'google-oauth2|114355703508299539934',
      value: 1,
    };
    const response = await upsertCommentVote(payload);
    expect(response).toBeDefined();
    expect(response.commentVote.value).toBe(0);
    expect(dbFindFirstCommentVoteSpy).toHaveBeenCalledTimes(2);
    expect(dbUpdateCommentVoteSpy).toHaveBeenCalledTimes(1);
    expect(dbCreateCommentVoteSpy).toHaveBeenCalledTimes(1);
  });

  it('sends same current value (Down)', async () => {
    const payload = {
      comment_id: 2,
      user: 'google-oauth2|100361217454991890939',
      value: -1,
    };
    const response = await upsertCommentVote(payload);
    expect(response).toBeDefined();
    expect(response.commentVote.value).toBe(0);
    expect(dbFindFirstCommentVoteSpy).toHaveBeenCalledTimes(3);
    expect(dbUpdateCommentVoteSpy).toHaveBeenCalledTimes(2);
    expect(dbCreateCommentVoteSpy).toHaveBeenCalledTimes(1);
  });

  it('changes value from Up to Down', async () => {
    const payload = {
      comment_id: 10,
      user: 'google-oauth2|114355703508299539934',
      value: -1,
    };
    const response = await upsertCommentVote(payload);
    expect(response).toBeDefined();
    expect(response.commentVote.value).toBe(-1);
    expect(dbFindFirstCommentVoteSpy).toHaveBeenCalledTimes(4);
    expect(dbUpdateCommentVoteSpy).toHaveBeenCalledTimes(3);
    expect(dbCreateCommentVoteSpy).toHaveBeenCalledTimes(1);
  });

  it('changes value from Down to Up', async () => {
    const payload = {
      comment_id: 2,
      user: 'google-oauth2|100361217454991890939',
      value: 1,
    };
    const response = await upsertCommentVote(payload);
    expect(response).toBeDefined();
    expect(response.commentVote.value).toBe(1);
    expect(dbFindFirstCommentVoteSpy).toHaveBeenCalledTimes(5);
    expect(dbUpdateCommentVoteSpy).toHaveBeenCalledTimes(4);
    expect(dbCreateCommentVoteSpy).toHaveBeenCalledTimes(1);
  });
});
