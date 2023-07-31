import { db } from 'app/utils/db.server';

const tearDownDb = async () => {
  await db.$connect();

  // Delete in reverse order
  await db.nps.deleteMany();
  await db.votes.deleteMany();
  await db.answers.deleteMany();
  await db.comments.deleteMany();
  await db.questions.deleteMany();
  await db.locations.deleteMany();
  await db.departments.deleteMany();
  await db.users.deleteMany();

  await db.$disconnect();
};

export default tearDownDb;
