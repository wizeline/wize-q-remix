import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
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

  return {
    success: "Comment has been created succesfully.",
    comment: created,
  }
}