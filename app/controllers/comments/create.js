import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import generateSessionIdHash from "~/utils/backend/crypto";
import { createCommentSchema } from "~/utils/backend/validators/comment"
import { db } from "~/utils/db.server";

export const createComment = async (data) => {
  const { error, value } = createCommentSchema.validate(data);

  if (error) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: error
      }
    }
  }

  const created = await db.Comments.create({
    data: {
      Questions: {
        connect: {
          question_id: value.questionId,
        },
      },
      comment: value.comment,
    }
  });

  let commentResponse = created;

  if (value.isAnonymous) {
    const sessionHash = generateSessionIdHash(value.user.accessToken, created.id);
    const updated = await db.Comments.update({
      where: {
        id: created.id,
      },
      data: {
        sessionHash: sessionHash,
      }
    });

    commentResponse = updated;
  }

  return {
    success: "Comment has been created succesfully.",
    comment: commentResponse,
  }
}