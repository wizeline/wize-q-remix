import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { npsSchema } from "~/utils/backend/validators/answer";
import { db } from "~/utils/db.server";

export const nps = async (query) => {
    const {error,value} = npsSchema.validate(query);
    const {id, score} = value;

    if (error) {
        return {errors:[{message:DEFAULT_ERROR_MESSAGE, detail:error.details}]}
    }

    try {
    const scored = await db.Nps.update({
        where:{id}, 
        data:{
            score,
        }
    })

    return {
        successMessage:'Score has been assigned successfully',
        scored
    } 
} catch (error) {
    return {
        error: {
            message: 'Answer not found',
            detail: 'Answer not found',
        }
    }
  }
}
