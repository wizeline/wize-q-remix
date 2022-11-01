import { db } from "../app/utils/db.server";

import questionsFixture from './fixtures/questions.json';
import usersFixture from './fixtures/users.json';
import locationsFixture from './fixtures/locations.json';
import departmentsFixture from './fixtures/departments.json';
import commentsFixture from './fixtures/comments.json';
import answersFixture from './fixtures/answers.json';
import votesFixture from './fixtures/votes.json';
import npsFixture from './fixtures/nps.json';
import commentVotes from './fixtures/commentVotes.json';

const initTestDb = async () => {
  await db.$connect()

  // Create users
  await db.users.createMany({
    data: usersFixture.map((user) => {
      return {
        ...user,
        is_admin: user.is_admin === 0 ? false : true,
      }
    }),
    skipDuplicates: true,
  });

  // Create users
  await db.Departments.createMany({
    data: departmentsFixture.map((department) => {
      return {
        ...department,
        is_active: department.is_active === 0 ? false : true,
      }
    }),
    skipDuplicates: true,
  });

  // Create locations
  await db.Locations.createMany({
    data: locationsFixture,
    skipDuplicates: true,
  });

  // Create questions
  await db.Questions.createMany({
    data: questionsFixture.map((question) => {
      return {
        ...question,
        is_anonymous: question.is_anonymous === 0 ? false : true,
        is_pinned: question.is_pinned === 0 ? false : true,
        last_email_notification_date: new Date(question.last_email_notification_date),
        createdAt: new Date(question.createdAt),
        updatedAt: new Date(question.updatedAt),
      }
    }),
    skipDuplicates: true,
  });

  // Create comments
  await db.Comments.createMany({
    data: commentsFixture.map((comment) => {
      return {
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      }
    }),
    skipDuplicates: true,
  });

  // Create answers
  await db.Answers.createMany({
    data: answersFixture.map((answer) => {
      return {
        ...answer,
        createdAt: new Date(answer.createdAt),
        updatedAt: new Date(answer.updatedAt),
        answer_date: new Date(answer.answer_date),
      }
    }),
    skipDuplicates: true,
  });

  // Create votes
  await db.Votes.createMany({
    data: votesFixture,
    skipDuplicates: true,
  })

  // Create nps
  await db.Nps.createMany({
    data: npsFixture,
    skipDuplicates: true,
  })

  //Create CommentVotes
  await db.CommentVote.createMany({
    data: commentVotes,
    skipDuplicates:true, 
  })
}

export default initTestDb;
