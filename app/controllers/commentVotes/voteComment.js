import { DEFAULT_ERROR_MESSAGE } from '~/utils/backend/constants';
import {
  commentVoteExistsSchema,
  commentVoteSchema,
} from '~/utils/backend/validators/commentVote';
import { db } from '~/utils/db.server';

const transformValue = (value) => {
  let transformedValue = 0;

  if (value >= 1) {
    transformedValue = 1;
  } else if (value <= -1) {
    transformedValue = -1;
  }

  return transformedValue;
};

const findCommentVote = async (query) => {
  const { error, value } = commentVoteExistsSchema.validate(query);
  const { comment_id, user } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  const commentVote = await db.CommentVote.findFirst({
    where: {
      comment_id,
      user,
    },
  });

  return commentVote;
};

export const upsertCommentVote = async (query) => {
  const { error, value } = commentVoteSchema.validate(query);
  const { comment_id, user, value: newValue } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  const foundComment = await findCommentVote({ comment_id, user });

  if (foundComment) {
    const alreadyUpvoted = foundComment.value >= 1 && newValue >= 1;
    const alreadyDownvoted = foundComment.value <= -1 && newValue <= -1;

    let temp;

    if (alreadyUpvoted || alreadyDownvoted) {
      temp = 0;
    } else {
      temp = newValue;
    }

    const commentVote = await db.CommentVote.update({
      where: {
        id: foundComment.id,
      },
      data: {
        value: transformValue(temp),
      },
    });

    return {
      success: 'Vote updated successfully!',
      commentVote,
    };
  }

  const commentVote = await db.CommentVote.create({
    data: {
      user,
      comment_id,
      value: transformValue(newValue),
    },
  });

  return { success: 'Vote created successfully!', commentVote };
};
