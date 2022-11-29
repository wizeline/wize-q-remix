import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { profileQuestionsCreatedSchema } from "~/utils/backend/validators/profile";
import { db } from "~/utils/db.server";

export const getQuestionsCreated = async(query) => {
  const { error, value } = profileQuestionsCreatedSchema.validate(query);
  const { employee_id } = value;

  if (error) {
    return {
      error: { message: DEFAULT_ERROR_MESSAGE, detail: error.details },
    };
  }

  try {
    const validUser = await db.users.findUniqueOrThrow({
      where: {
        employee_id,
      }
    });
  
    return await db.Questions.findMany({
      where: {
        created_by_employee_id: validUser.employee_id,
      },
    });
  } catch (error) {
    return {
      error: { message: 'The user was not found', detail: 'ID not found' }
    }
  }
}