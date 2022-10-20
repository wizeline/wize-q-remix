import { db } from "~/utils/db.server";
import {
    INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  } from "~/utils/constants";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "~/utils/backend/constants";
import { canEditComment } from "~/utils/backend/comments";

const findValue = (element,userId,value) => {
    return element.user == userId && element.value == value;
}

const reorderCommentsByVotes = (first, second) => {
    if((first.approvedBy !== null && second.approvedBy === null)||
       (first.votes > second.votes)||
       (first.recent_activity > second.recent_activity)){
        return  -1;
    }
    if((first.approvedBy === null && second.approvedBy !== null)|| 
       (first.votes < second.votes)||
       (first.recent_activity < second.recent_activity)){
        return  1;
    }
    return 0;
}

const reorderCommentsByActivity = (first, second) => {
    if((first.approvedBy !== null && second.approvedBy === null)||
       (first.recent_activity > second.recent_activity)){
        return  -1;
    }
    if((first.approvedBy === null && second.approvedBy !== null)|| 
       (first.recent_activity < second.recent_activity)){
        return  1;
    }
    return 0;
}

export const listComments = async (params) => {
const {questionId, limit, offset, userEmail , userId, sortBy, sessionToken} = params


if(!questionId || questionId < 1 ){
    return {
        error: {
            message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
            details: 'The question id must be an integer not minor to 1',
        }
    }
}

const fetchComments = await db.Comments.findMany({
    where: {
        questionId: questionId
    },
    take: limit || DEFAULT_LIMIT,
    skip: offset || DEFAULT_OFFSET,
    include:{
        Approver: true,
        User: true,
        CommentVote:true,
    }
});

const comments =  fetchComments.map((comment) => {
    comment.canEdit = canEditComment(comment, userEmail, sessionToken);
    delete comment.sessionHash;
    comment.votes = comment.CommentVote.reduce((acc, current)=> {
        return acc + current.value
    }, 0);
    comment.has_upvote = comment.CommentVote.some((comment) => findValue(comment, userId, 1));
    comment.has_downvoted =  comment.CommentVote.some((comment) => findValue(comment, userId, -1));
    comment.recent_activity = comment.updatedAt > comment.createdAt ? comment.updatedAt : comment.createdAt;
    return comment;
});
sortBy === "votes" ? comments.sort(reorderCommentsByVotes) : comments.sort(reorderCommentsByActivity);;
return { success: true, comments};
}