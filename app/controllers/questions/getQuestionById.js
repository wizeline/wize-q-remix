/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { db } from 'app/utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from 'app/utils/constants';
import generateSessionIdHash from 'app/utils/backend/crypto';

const getQuestionById = async (questionId, user) => {
  if (!questionId || typeof questionId !== 'number' || parseInt(questionId, 10) < 1) {
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
    const unmappedQuestion = await db.Questions.findUnique({
      where: { question_id: questionId },
      include: {
        _count: {
          select: {
            Comments: true,
            Votes: true,
          },
        },
        Votes: true,
        Answers: {
          include: {
            Nps: true,
            AnsweredBy: true,
          },
        },
        created_by: true,
        assigned_to: { select: { full_name: true } },
        Department: true,
      },
    });
    const hasUserData = user && user.id;
    const hasAnswer = unmappedQuestion.Answers.length > 0;

    let canUndoNps = false;
    if (unmappedQuestion.Answers.length > 0) {
      const npsSessionHash = generateSessionIdHash(
        user.id,
        unmappedQuestion.Answers[0].answer_id,
      );
      canUndoNps = unmappedQuestion.Answers[0].Nps.some(
        (nps) => nps.session_hash === npsSessionHash,
      );
    }

    const Answer = unmappedQuestion.Answers.length < 1
      ? null
      : {
        ...unmappedQuestion.Answers[0],
        canUndoNps,
        hasScored: (hasUserData
          && hasAnswer
          && unmappedQuestion.Answers[0].Nps.some((nps) => nps.user === user.id)) ?? false,
      };

    let can_edit;
    // eslint-disable-next-line array-callback-return, consistent-return
    const numLikes = unmappedQuestion.Votes.filter((vote) => {
      if (vote.is_upvote || vote.is_upvote === null) {
        return { ...vote };
      }
    }).length;

    // eslint-disable-next-line array-callback-return, consistent-return
    const numDisklike = unmappedQuestion.Votes.filter((vote) => {
      if (!vote.is_upvote && vote.is_upvote !== null) {
        return { ...vote };
      }
    }).length;

    const hasLike = (hasUserData
      && unmappedQuestion.Votes.some(
        (vote) => (vote.is_upvote || vote.is_upvote === null) && vote.user === user.id,
      )
    ) ?? false;

    const hasDislike = (hasUserData
        && unmappedQuestion.Votes.some(
          (vote) => (!vote.is_upvote && vote.is_upvote !== null) && vote.user === user.id,
        )
    ) ?? false;
    // eslint-disable-next-line max-len
    if (unmappedQuestion.created_by) can_edit = user && user.email && user.email === unmappedQuestion.created_by.email;

    const mappedQuestion = {
      ...unmappedQuestion,
      hasVoted: unmappedQuestion.Votes.some((vote) => vote.user === user.id) ?? false,
      num_votes: unmappedQuestion._count.Votes,
      numComments: unmappedQuestion._count.Comments,
      Answer,
      can_edit,
      numLikes,
      numDisklike,
      hasLike,
      hasDislike,
    };

    return {
      question: mappedQuestion,
    };
  } catch (error) {
    return {
      error: {
        message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default getQuestionById;
