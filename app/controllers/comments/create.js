import {
  DEFAULT_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from 'app/utils/constants';
import generateSessionIdHash from 'app/utils/crypto';
import createCommentSchema from 'app/utils/validators/comment';
import { db } from 'app/utils/db.server';

const createComment = async (data) => {
  const { error, value } = createCommentSchema.validate(data);

  if (error) {
console.log('error - ', error);
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: error,
      },
    };
  }

  if (!value.isAnonymous && !value.user.useremail) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The comment is not anonymous but no user email was provided in the user object',
      },
    };
  }

  const commentData = {
    questions: {
      connect: {
        question_id: value.questionid,
      },
    },
    comment: value.comment,
  };

  if (!value.isAnonymous) {
    commentData.user = {
      connect: {
        email: value.user.useremail,
      },
    };
    commentData.username = value.user.username;
  }

  const created = await db.comments.create({
    data: commentData,
  });

  let commentResponse = created;

  if (value.isAnonymous) {
    const sessionhash = generateSessionIdHash(value.user.accessToken, created.id);
    const updated = await db.comments.update({
      where: {
        id: created.id,
      },
      data: {
        sessionhash,
      },
    });
    commentResponse = updated;
  }

  return {
    successMessage: 'The comment was created succesfully.',
    comment: commentResponse,
  };
};

export default createComment;
