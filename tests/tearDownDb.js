import { db } from 'app/utils/db.server';

const tearDownDb = async () => {
  await db.$connect();

  // Delete in reverse order
  await db.nps.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "nps_id_seq" RESTART WITH 1;`;

  await db.votes.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "votes_id_seq" RESTART WITH 1;`;

  await db.answers.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "answers_answer_id_seq" RESTART WITH 1;`;

  await db.commenttags.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "commenttags_tag_id_seq" RESTART WITH 1;`;

  await db.comments.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "comments_id_seq" RESTART WITH 1;`;

  await db.questions.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "questions_question_id_seq" RESTART WITH 1;`;

  await db.locations.deleteMany();
  // await db.$queryRaw`ALTER SEQUENCE "locations_id_seq" RESTART WITH 1;`;

  await db.departments.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "departments_department_id_seq" RESTART WITH 1;`;

  await db.users.deleteMany();
  await db.$queryRaw`ALTER SEQUENCE "users_employee_id_seq" RESTART WITH 1;`;

  await db.$disconnect();
};

export default tearDownDb;
