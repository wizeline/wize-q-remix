/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { db } from 'app/utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from 'app/utils/constants';
import generateSessionIdHash from 'app/utils/crypto';

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
    const unmappedQuestion = await db.questions.findUnique({
      where: { question_id: questionId },
      include: {
        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
        votes: true,
        answers: {
          include: {
            nps: true,
            answeredby: true,
          },
        },
        created_by: true,
        assigned_to: { select: { full_name: true } },
        department: true,
      },
    });
    const hasUserData = user && user.id;
    const hasAnswer = unmappedQuestion.answers.length > 0;

    let canUndoNps = false;
    if (unmappedQuestion.answers.length > 0) {
      const npsSessionHash = generateSessionIdHash(
        user.id,
        unmappedQuestion.answers[0].answer_id,
      );
      canUndoNps = unmappedQuestion.answers[0].nps.some(
        (nps) => nps.session_hash === npsSessionHash,
      );
    }

    const Answer = unmappedQuestion.answers.length < 1
      ? null
      : {
        ...unmappedQuestion.answers[0],
        canUndoNps,
        hasScored: (hasUserData
          && hasAnswer
          && unmappedQuestion.answers[0].nps.some((nps) => nps.user === user.id)) ?? false,
      };

    let can_edit;
    // eslint-disable-next-line array-callback-return, consistent-return
    const numLikes = unmappedQuestion.votes.filter((vote) => {
      if (vote.is_upvote || vote.is_upvote === null) {
        return { ...vote };
      }
    }).length;

    // eslint-disable-next-line array-callback-return, consistent-return
    const numDisklike = unmappedQuestion.votes.filter((vote) => {
      if (!vote.is_upvote && vote.is_upvote !== null) {
        return { ...vote };
      }
    }).length;

    const hasLike = (hasUserData
      && unmappedQuestion.votes.some(
        (vote) => (vote.is_upvote || vote.is_upvote === null) && vote.user === user.id,
      )
    ) ?? false;

    const hasDislike = (hasUserData
        && unmappedQuestion.votes.some(
          (vote) => (!vote.is_upvote && vote.is_upvote !== null) && vote.user === user.id,
        )
    ) ?? false;
    // eslint-disable-next-line max-len
    if (unmappedQuestion.created_by) can_edit = user && user.email && user.email === unmappedQuestion.created_by.email;

    const mappedQuestion = {
      ...unmappedQuestion,
      hasVoted: unmappedQuestion.votes.some((vote) => vote.user === user.id) ?? false,
      num_votes: unmappedQuestion._count.votes,
      numComments: unmappedQuestion._count.comments,
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
    console.log('error getQuestionById ', error);
    return {
      error: {
        message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default getQuestionById;
