import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { sanitizeHTML } from "~/utils/backend/sanitizer";
import { questionSchema } from "~/utils/backend/validators/question";
import { db } from "~/utils/db.server"

export const createQuestion = async (body) => {
  const { error, value } = questionSchema.validate(body);

  if (error) {
    console.error(error);
    return {
      errors: [
        {
          message: DEFAULT_ERROR_MESSAGE,
          detail: error,
        }
      ] 
    }
  }

  // TODO: Generate user hash on anonymous
  
  const createdQuestion = await db.Questions.create({
    data: {
      ...value,
      question: sanitizeHTML(value.question),
    }
  });

  // TODO: Send slack notification

  return {
    success: "Question has been created succesfully!",
    question: createdQuestion,
  };
}