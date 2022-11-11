import { db } from "~/utils/db.server";
import { approvedByCommentSchema } from "~/utils/backend/validators/comments";
import { INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE } from "~/utils/constants";
import { COMMENT_AS_AN_ANSWER, DEFAULT_ERROR_MESSAGE} from '~/utils/backend/constants';
import { isEmptyObject } from '~/utils/backend/objectUtils';

export const approvedByComment = async(params) => {
    const { error, value } = approvedByCommentSchema.validate(params);

    if (error) {
        return {
          errors: [
            {
              message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
              detail: error,
            },
          ],
        };
    }

    const {questionId, commentId, employeeId, checked} = value;
    const fetchComments = await db.Comments.findMany({where: {
        AND:[{
            questionId: questionId
        },{
            id:{
                not: commentId
            }
        },{
            approvedBy:{
                not: null
            }
        }]
    }});
    
    const hasAnswer =  fetchComments.length > 0;
    if(hasAnswer){
        return{
            errors: [
                {
                    message: COMMENT_AS_AN_ANSWER,
                    detail: COMMENT_AS_AN_ANSWER
                }
            ]
        }
    }

    const commentUpdated = await db.Comments.update({ 
        where: {id: commentId}, 
        data: {approvedBy: checked ? employeeId: null 
    }});

    if(isEmptyObject(commentUpdated)){
        return {
            error: {
              message: DEFAULT_ERROR_MESSAGE,
              detail: "Something went wrong trying to update the comment",
            },
          };
    }

    return {
        success: `Comment ${checked? 'marked' : 'unmarked'} as an answer successfully`,
        response: `Comment ${checked? 'marked' : 'unmarked'} as an answer successfully`,
    };
}