import { db } from "~/utils/db.server";
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE
} from "~/utils/constants";

export const getQuestionById = async (questionId) => {
  if (!questionId || typeof questionId !== "number" || parseInt(questionId) < 1) {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        detail: "The question id must be an integer not minor to 1",
      },
    };
  }
  
  try {
    const question = await db.Questions.findUnique({
        where: { question_id : questionId },
        include: {
          created_by: true,
          assigned_to: true,
          Answers: {
            include: {
              Nps: true,
              user: true,
            }
          },
          Department: {
            select: {
              name: true,
            }
          }
        }
      });
      return {
        success: true,
        question,
      }
  } catch (error) {
    console.log('Actual error');
    console.log(error);
    return {
        error: {
            message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
            detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        }
    }
  }
};
