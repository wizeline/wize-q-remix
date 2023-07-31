/* eslint-disable no-param-reassign */
import { db } from 'app/utils/db.server';

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
  await db.$connect();

  // Create users
  await db.users.createMany({
    data: usersFixture.map((user) => ({
      ...user,
      is_admin: user.is_admin !== 0,
    })),
    skipDuplicates: true,
  });

  // Create users
  await db.departments.createMany({
    data: departmentsFixture.map((department) => ({
      ...department,
      is_active: department.is_active !== 0,
    })),
    skipDuplicates: true,
  });

  // Create locations
  await db.locations.createMany({
    data: locationsFixture,
    skipDuplicates: true,
  });

  // Create questions
  await db.questions.createMany({
    data: questionsFixture.map((question) => {
      const initialDate = new Date().setMonth(new Date().getMonth() - 1); // one month before today.
      question.createdAt = question.createdAt === undefined ? initialDate : question.createdAt;
      question.updatedAt = question.updatedAt === undefined ? new Date() : question.updatedAt;
      return {
        ...question,
        is_anonymous: question.is_anonymous !== 0,
        is_pinned: question.is_pinned !== 0,
        last_email_notification_date: new Date(question.last_email_notification_date),
        createdAt: new Date(question.createdAt),
        updatedAt: new Date(question.updatedAt),
      };
    }),
    skipDuplicates: true,
  });

  // Create comments
  await db.comments.createMany({
    data: commentsFixture.map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    })),
    skipDuplicates: true,
  });

  // Create answers
  await db.answers.createMany({
    data: answersFixture.map((answer) => ({
      ...answer,
      createdAt: new Date(answer.createdAt),
      updatedAt: new Date(answer.updatedAt),
      answer_date: new Date(answer.answer_date),
    })),
    skipDuplicates: true,
  });

  // Create votes
  await db.votes.createMany({
    data: votesFixture,
    skipDuplicates: true,
  });

  // Create nps
  await db.nps.createMany({
    data: npsFixture,
    skipDuplicates: true,
  });

  // Create CommentVotes
  await db.commentvote.createMany({
    data: commentVotes,
    skipDuplicates: true,
  });
};

export default initTestDb;
