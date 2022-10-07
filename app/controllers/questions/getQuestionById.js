import { db } from "~/utils/db.server";
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE
} from "~/utils/constants";

export const getQuestionById = async (questionId, user) => {
  if (!questionId || typeof questionId !== "number" || parseInt(questionId) < 1) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: "The question id must be an integer not minor to 1",
      },
    };
  }

  if (!user) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: "Please provide the user object",
      },
    };
  }
  
  try {
    const unmappedQuestion = await db.Questions.findUnique({
        where: { question_id : questionId },
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
            }
          },
          created_by: true,
          Department: true,
        }
      });
      const hasUserData = user && user.id;
      const hasAnswer = unmappedQuestion.Answers.length > 0;

      const Answer = unmappedQuestion.Answers.length < 1 
        ? null
        : {
          ...unmappedQuestion.Answers[0],
          hasScored: (hasUserData && hasAnswer && unmappedQuestion.Answers[0].Nps.some((nps) => nps.user === user.id)) ?? false,
        }; 

      const mappedQuestion = {
        ...unmappedQuestion,
        hasVoted: unmappedQuestion.Votes.some((vote) => vote.user === user.id) ?? false,
        num_votes: unmappedQuestion._count.Votes,
        numComments: unmappedQuestion._count.Comments,
        Answer,
      }

      return {
        success: true,
        question: mappedQuestion,
      }

  } catch (error) {
    return {
        error: {
            message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
            detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        }
    }
  }
};
