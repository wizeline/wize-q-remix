import { db } from 'app/utils/db.server';
import generateSessionIdHash from 'app/utils/crypto';
import { generateMinMaxDates } from 'app/utils/comments/comments';
import {
  DEFAULT_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  UPDATE_COMMENT_ERROR_MESSAGE,
} from 'app/utils/constants';
import { updateCommentSchema } from 'app/utils/validators/comments';

const updateComment = async (body) => {
  const { error, value } = updateCommentSchema.validate(body);

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

  const {
    commentid: id, comment, accessToken, useremail,
  } = value;

  const sessionhash = generateSessionIdHash(accessToken, id);
  const { minDate, maxDate } = generateMinMaxDates();

  const updateCommentResponse = await db.comments.updateMany({
    data: { comment },
    where: {
      id,
      OR: [
        {
          useremail,
        },
        {
          AND: [
            {
              sessionhash,
            },
            {
              createdat: { lte: new Date(maxDate) },
            },
            {
              createdat: { gte: new Date(minDate) },
            },
          ],
        },
      ],
    },
  });

  if (updateCommentResponse.count === undefined || typeof updateCommentResponse.count !== 'number') {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: 'Something went wrong trying to update the comment',
      },
    };
  }

  if (updateCommentResponse.count === 0) {
    return {
      error: {
        message: UPDATE_COMMENT_ERROR_MESSAGE,
        detail:
          'Comment not found or user does not have edit rights over the comment',
      },
    };
  }
  if (updateCommentResponse.count === 1) {
    return {
      successMessage: 'The comment was updated successfully!',
    };
  }

  return {
    error: {
      message: UPDATE_COMMENT_ERROR_MESSAGE,
      detail: `More than one comment was updated, which should not have happened, number of affected comments: ${updateCommentResponse.count}`,
    },
  };
};

export default updateComment;
