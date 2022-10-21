import { db } from "~/utils/db.server";
import generateSessionIdHash from "~/utils/backend/crypto";
import { generateMinMaxDates } from "~/utils/backend/comments";
import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  UPDATE_COMMENT_ERROR_MESSAGE,
} from "~/utils/constants";
import { updateCommentSchema } from "~/utils/backend/validators/comments";

export const updateComment = async (body) => {
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

  const { commentId: id, comment, accessToken, userEmail } = value;

  const sessionHash = generateSessionIdHash(accessToken, id);
  const { minDate, maxDate } = generateMinMaxDates();

  const updateCommentResponse = await db.Comments.updateMany({
    data: { comment },
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

  if (updateCommentResponse.count === undefined || typeof updateCommentResponse.count !== 'number') {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: "Something went wrong trying to update the comment",
      },
    };
  }

  if (updateCommentResponse.count === 0) {
    return {
      error: {
        message: UPDATE_COMMENT_ERROR_MESSAGE,
        detail:
          "Comment not found or user does not have edit rights over the comment",
      },
    };
  }
  if (updateCommentResponse.count === 1) {
    return {
      success: true,
      response: "Comment was updated successfully",
    };
  }

  return {
    error: {
      message: UPDATE_COMMENT_ERROR_MESSAGE,
      detail: `More than one comment was updated, which should not have happened, number of affected comments: ${updateCommentResponse.count}`,
    },
  }
};
