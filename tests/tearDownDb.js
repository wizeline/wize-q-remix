import { db } from 'app/utils/db.server';

const tearDownDb = async () => {
  await db.$connect();

  // Delete in reverse order
  await db.Nps.deleteMany();
  await db.Votes.deleteMany();
  await db.Answers.deleteMany();
  await db.Comments.deleteMany();
  await db.Questions.deleteMany();
  await db.Locations.deleteMany();
  await db.Departments.deleteMany();
  await db.users.deleteMany();

  await db.$disconnect();
};

export default tearDownDb;
