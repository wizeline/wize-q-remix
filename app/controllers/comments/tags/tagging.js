import { db } from 'app/utils/db.server';
import { tagCommentSchema } from 'app/utils/validators/comments';

const taggingComment = async (params) => {
  const { value, error } = tagCommentSchema.validate(params);

  if (error) {
    return {
      error: {
        message: 'Something went wrong tagging a comment!',
        detail: error,
      },
    };
  }
  try {
    const { commentId, tagId, taggedBy } = value;
    const commentUpdated = await db.comments.update({
      where: {
        id: commentId,
      },
      data: {
        tag_id: tagId,
        taggedby: taggedBy,
      },
    });

    return {
      successMessage: `The comment was ${(tagId === null && taggedBy === null) ? 'removed' : 'tagged'} succesfully.`,
      comment: commentUpdated,
    };
  } catch (e) {
    return {
      error: {
        message: 'Comment not found',
        detail: e,
      },
    };
  }
};

export default taggingComment;
