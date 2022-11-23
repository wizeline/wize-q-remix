import { db } from "~/utils/db.server";
import { profileQuestionsCreatedSchema } from "~/utils/backend/validators/profile";

export const getQuestionsCreated = async(query) => {
  const { error, value } = profileQuestionsCreatedSchema.validate(query);
  const { employee_id } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  return await db.Questions.findMany({
    where: {
      created_by_employee_id: employee_id,
    },
  });
}