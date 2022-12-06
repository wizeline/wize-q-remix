import { DEFAULT_ERROR_MESSAGE } from '../../utils/backend/constants';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from '../../utils/constants';
import generateSessionIdHash from '../../utils/backend/crypto';
import { createCommentSchema } from '../../utils/backend/validators/comment';
import { db } from '~/utils/db.server';

export const createComment = async (data) => {
  const { error, value } = createCommentSchema.validate(data);

  if (error) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: error,
      },
    };
  }

  if (!value.isAnonymous && !value.user.userEmail) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The comment is not anonymous but no user email was provided in the user object',
      },
    };
  }

  const commentData = {
    Questions: {
      connect: {
        question_id: value.questionId,
      },
    },
    comment: value.comment,
  };

  if (!value.isAnonymous) {
    commentData.User = {
      connect: {
        email: value.user.userEmail,
      },
    };
    commentData.userName = value.user.userName;
  }

  const created = await db.Comments.create({
    data: commentData,
  });

  let commentResponse = created;

  if (value.isAnonymous) {
    const sessionHash = generateSessionIdHash(value.user.accessToken, created.id);
    const updated = await db.Comments.update({
      where: {
        id: created.id,
      },
      data: {
        sessionHash,
      },
    });
    commentResponse = updated;
  }

  return {
    successMessage: 'Comment has been created succesfully.',
    comment: commentResponse,
  };
};
