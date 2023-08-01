import { db } from 'app/utils/db.server';
import { approvedByCommentSchema } from 'app/utils/validators/comments';
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE, COMMENT_AS_AN_ANSWER, DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import isEmptyObject from 'app/utils/objectUtils';

const approvedByComment = async (params) => {
  const { error, value } = approvedByCommentSchema.validate(params);

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
    questionid, commentid, employeeid, checked,
  } = value;
  const fetchComments = await db.comments.findMany({
    where: {
      AND: [{
        questionid,
      }, {
        id: {
          not: commentid,
        },
      }, {
        approvedby: {
          not: null,
        },
      }],
    },
  });

  const hasAnswer = fetchComments.length > 0;
  if (hasAnswer) {
    return {
      errors: [
        {
          message: COMMENT_AS_AN_ANSWER,
          detail: COMMENT_AS_AN_ANSWER,
        },
      ],
    };
  }

  const commentUpdated = await db.comments.update({
    where: { id: commentid },
    data: { approvedby: checked ? employeeid : null },
  });

  if (isEmptyObject(commentUpdated)) {
    return {
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        detail: 'Something went wrong trying to update the comment',
      },
    };
  }

  return {
    successMessage: `Comment ${checked ? 'marked' : 'unmarked'} as an approved answer successfully`,
    response: `Comment ${checked ? 'marked' : 'unmarked'} as an approved answer successfully`,
  };
};

export default approvedByComment;
