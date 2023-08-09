/* eslint-disable no-param-reassign */
import { Prisma } from '@prisma/client';
import { db } from 'app/utils/db.server';
import {
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
} from 'app/utils/constants';
import { canEditComment } from 'app/utils/comments/comments';

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

  const fetchComments = await db.$queryRaw`SELECT
  cmts.id,
  cmts.comment,
  cmts."updatedat",
  cmts."createdat",
  (SELECT
     CASE
       WHEN cmts."updatedat" IS NULL THEN cmts."createdat"
       WHEN cmts."updatedat" > cmts."createdat" THEN cmts."updatedat"
       ELSE cmts."createdat"
     END) AS recent_activity,
  cmts."questionid",
  cmts."sessionhash",
  cmts."username",
  cmts."useremail",
  cmts."approvedby",
  (SELECT
     COALESCE(SUM("commentvote".value), 0)
   FROM "commentvote"
   WHERE "commentvote".comment_id = cmts.id) AS votes,
  (SELECT
     CASE
       WHEN EXISTS(SELECT * FROM "commentvote" WHERE "commentvote".comment_id = cmts.id AND "commentvote".user = ${userId} AND "commentvote".value = 1) THEN true
       ELSE false
     END) AS has_upvoted,
  (SELECT
     CASE
       WHEN EXISTS(SELECT * FROM "commentvote" WHERE "commentvote".comment_id = cmts.id AND "commentvote".user = ${userId} AND "commentvote".value = -1) THEN true
       ELSE false
     END) AS has_downvoted,
  "User".employee_id AS "UserEmployee_id",
  "User".full_name AS "UserFull_name",
  "User".is_admin AS "UserIs_admin",
  "User".profile_picture AS "UserProfile_picture",
  "User".job_title AS "UserJob_title",
  Approver.employee_id AS "ApproverEmployee_id",
  Approver.full_name AS "ApproverFull_name",
  Approver.is_admin AS "ApproverIs_admin",
  Approver.profile_picture AS "ApproverProfile_picture",
  Approver.job_title AS "ApproverJob_title"
FROM
  "comments" AS cmts
LEFT JOIN
  "users" AS "User" ON cmts."useremail" = "User".email
LEFT JOIN
  "users" AS Approver ON cmts."approvedby" = Approver.employee_id
WHERE
  cmts."questionid" = ${questionId}
 ${sortBy === 'votes' ? Prisma.sql`ORDER BY cmts.approvedby ASC, votes DESC, recent_activity DESC` : Prisma.sql`ORDER BY cmts.approvedby ASC, recent_activity DESC`}
`;
  const comments = fetchComments.map((comment) => {
    comment.canEdit = canEditComment(comment, userEmail, sessionToken);
    delete comment.sessionhash;

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
