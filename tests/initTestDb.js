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
import tags from './fixtures/tags.json';

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
      question.createdat = question.createdat === undefined ? initialDate : question.createdat;
      question.updatedat = question.updatedat === undefined ? new Date() : question.updatedat;
      return {
        ...question,
        is_anonymous: question.is_anonymous !== 0,
        is_pinned: question.is_pinned !== 0,
        last_email_notification_date: new Date(question.last_email_notification_date),
        createdat: new Date(question.createdat),
        updatedat: new Date(question.updatedat),
      };
    }),
    skipDuplicates: true,
  });

  // Create comments
  await db.comments.createMany({
    data: commentsFixture.map((comment) => ({
      ...comment,
      createdat: new Date(comment.createdat),
      updatedat: new Date(comment.updatedat),
    })),
    skipDuplicates: true,
  });

  // Create answers
  await db.answers.createMany({
    data: answersFixture.map((answer) => ({
      ...answer,
      createdat: new Date(answer.createdat),
      updatedat: new Date(answer.updatedat),
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

  // Create tags
  await db.commenttags.createMany({
    data: tags,
    skipDuplicates: true,
  });
};

export default initTestDb;
