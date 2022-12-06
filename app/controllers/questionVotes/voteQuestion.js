/* eslint-disable no-underscore-dangle */
import { db } from '../../utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
  INVALIDATE_VOTE_ERROR_MESSAGE,
} from '../../utils/constants';

export const voteQuestion = async (questionId, user) => {
  if (
    !questionId
    || typeof questionId !== 'number'
    || parseInt(questionId, 10) < 1
  ) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'The question id must be an integer not minor to 1',
      },
    };
  }

  if (!user) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: 'Please provide the user object',
      },
    };
  }

  try {
    const targetQuestion = await db.Questions.findUniqueOrThrow({
      where: { question_id: questionId },
      include: {
        _count: {
          select: {
            Votes: true,
          },
        },
      },
    });

    const voteByUser = await db.Votes.findFirst({
      where: {
        question_id: questionId, user: user.id,
      },
    });
    if (voteByUser === null) {
      const newVote = await db.Votes.create({
        data: {
          question_id: targetQuestion.question_id,
          user: user.id,
          is_upvote: null,
        },
      });

      return {
        response: {
          vote: newVote,
          upVoteCount: targetQuestion._count.Votes + 1,
        },
      };
    }

    try {
      const deletedVote = await db.Votes.delete({ where: { id: voteByUser.id } });
      return {
        response: {
          voteSuccessfullyDeleted: true,
          deletedVote,
          upVoteCount: targetQuestion._count.Votes - 1,
        },
      };
    } catch (error) {
      return {
        error: {
          message: INVALIDATE_VOTE_ERROR_MESSAGE,
          detail: INVALIDATE_VOTE_ERROR_MESSAGE,
        },
      };
    }
  } catch (error) {
    return {
      error: {
        message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};
