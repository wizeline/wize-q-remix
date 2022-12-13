/* eslint-disable no-param-reassign */
import { Prisma } from '@prisma/client';
import { db } from 'app/utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from 'app/utils/constants';
import { canEditComment } from 'app/utils/backend/comments';

const listComments = async (params) => {
  const {
    questionId, userEmail, userId, sortBy, sessionToken,
  } = params;

  if (!questionId || questionId < 1 || typeof questionId !== 'number') {
    return {
      error: {
        message: INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
        details: 'The question id must be an integer not minor to 1',
      },
    };
  }

  const fetchComments = await db.$queryRaw`
SELECT c.id,
c.comment,
c.createdAt,
(SELECT CASE WHEN ISNULL(updatedAt) THEN createdAt WHEN updatedAt > createdAt THEN updatedAt ELSE createdAt END) as recent_activity,
c.questionId, 
c.sessionHash,
c.userName,
c.userEmail,
c.approvedBy,
(SELECT IFNULL(SUM(CommentVote.value), 0) FROM CommentVote WHERE CommentVote.comment_id = c.id) as votes,
(SELECT IF (EXISTS(SELECT * FROM CommentVote WHERE CommentVote.comment_id = c.id AND CommentVote.user = ${userId} AND CommentVote.value = 1), true, false)) as has_upvoted, 
(SELECT IF (EXISTS(SELECT * FROM CommentVote WHERE CommentVote.comment_id = c.id AND CommentVote.user = ${userId} AND CommentVote.value = -1), true, false)) as has_downvoted, 
User.employee_id as 'UserEmployee_id',
User.full_name as 'UserFull_name',
User.is_admin as 'UserIs_admin',
User.profile_picture as 'UserProfile_picture',
User.job_title as 'UserJob_title',
Approver.employee_id as 'ApproverEmployee_id',
Approver.full_name as 'ApproverFull_name',
Approver.is_admin as 'ApproverIs_admin',
Approver.profile_picture as 'ApproverProfile_picture',
Approver.job_title as 'ApproverJob_title'
FROM Comments  as c 
LEFT JOIN users as User
ON c.userEmail = User.email
LEFT JOIN users as Approver
ON c.approvedBy = Approver.employee_id
WHERE c.questionId = ${questionId}
${sortBy === 'votes' ? Prisma.sql`ORDER BY approvedBy DESC, votes DESC, recent_activity DESC` : Prisma.sql`ORDER BY approvedBy DESC, recent_activity DESC`}`;

  const comments = fetchComments.map((comment) => {
    comment.canEdit = canEditComment(comment, userEmail, sessionToken);
    delete comment.sessionHash;

    const User = {
      employee_id: comment.UserEmployee_id,
      full_name: comment.UserFull_name,
      is_admin: comment.UserIs_admin,
      profile_picture: comment.UserProfile_picture,
      job_title: comment.UserJob_title,
    };
    comment.User = User;
    const Approver = {
      employee_id: comment.ApproverEmployee_id,
      full_name: comment.ApproverFull_name,
      is_admin: comment.ApproverIs_admin,
      profile_picture: comment.ApproverProfile_picture,
      job_title: comment.ApproverJob_title,
    };
    comment.Approver = Approver;
    comment.has_downvoted = comment.has_downvoted === 1;
    comment.has_upvoted = comment.has_upvoted === 1;

    delete comment.UserEmployee_id;
    delete comment.UserFull_name;
    delete comment.UserIs_admin;
    delete comment.UserProfile_picture;
    delete comment.UserJob_title;
    delete comment.ApproverEmployee_id;
    delete comment.ApproverFull_name;
    delete comment.ApproverIs_admin;
    delete comment.ApproverProfile_picture;
    delete comment.ApproverJob_title;

    return comment;
  });
  return { comments };
};

export default listComments;
