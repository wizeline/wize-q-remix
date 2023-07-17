import { db } from 'app/utils/db.server';
import generateSessionIdHash from 'app/utils/crypto';
import { generateMinMaxDates } from 'app/utils/comments/comments';
import { deleteCommentSchema } from 'app/utils/validators/comments';
import {
  DEFAULT_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  DELETE_COMMENT_ERROR_MESSAGE,
} from 'app/utils/constants';

const deleteComment = async (body) => {
  const { error, value } = deleteCommentSchema.validate(body);

  if (error) {
    return {
      errors: [
        {
          message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
          detail: error,
        },
      ],
    };
  }

  const { commentId: id, accessToken, userEmail } = value;

  const sessionHash = generateSessionIdHash(accessToken, id);
  const { minDate, maxDate } = generateMinMaxDates();

  const deleteCommentResponse = await db.Comments.deleteMany({
    where: {
      id,
      OR: [
        {
          userEmail,
        },
        {
          AND: [
            {
              sessionHash,
            },
            {
              createdAt: { lte: new Date(maxDate) },
            },
            {
              createdAt: { gte: new Date(minDate) },
            },
          ],
        },
      ],
    },
  });

  if (
    deleteCommentResponse.count === undefined
    || typeof deleteCommentResponse.count !== 'number'
  ) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: 'Something went wrong trying to delete the comment',
      },
    };
  }

  if (deleteCommentResponse.count === 0) {
    return {
      error: {
        message: DELETE_COMMENT_ERROR_MESSAGE,
        detail:
          `Comment not found or user does not have deletion rights over the comment. Comment id: ${id}`,
      },
    };
  }
  if (deleteCommentResponse.count === 1) {
    return {
      successMessage: 'The comment was deleted successfully',
    };
  }

  return {
    error: {
      message: DELETE_COMMENT_ERROR_MESSAGE,
      detail: `Multiple comments were deleted, which should not have happened, number of affected comments: ${deleteCommentResponse.count}`,
    },
  };
};

export default deleteComment;
