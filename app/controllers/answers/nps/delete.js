import { deleteNPSSchema } from "~/utils/backend/validators/nps";
import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { db } from "~/utils/db.server";

export const deleteNPS = async (params) => {
  const { error, value } = deleteNPSSchema.validate(params);

  if (error) {
    return {
      errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }],
    };
  }
  const {id, user}= value;
  try
  {
 
   await db.Nps.delete({
        where:{
          answer_id_user: {
            answer_id: id , 
            user: user.id
        }}
    });

    return{
      success: 'NetScore has been deleted succesfully.',
    }

  }
  catch(error){
    return {
        errors: [
          {
            message: "Something went wrong at delete the netscore",
            detail: error,
          },
        ],
      };
  }
};
