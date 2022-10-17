import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { assignQuestionSchema } from "~/utils/backend/validators/question"
import { db } from "~/utils/db.server";

export const assignQuestion = async (query) => {
    const {error,value} = assignQuestionSchema.validate(query);
    const {question_id, assigned_department} = value;

    if (error) {
        return {errors:[{message:DEFAULT_ERROR_MESSAGE, detail:error.details}]}
    }

    const assignedQuestion = await db.Questions.update({
        where:{question_id}, 
        data:{
            assigned_department,
        }
    })

    return{
        success:'Department has been assigned successfully',
        assignedQuestion
    }
}
