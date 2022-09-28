import { db } from "~/utils/db.server";
import questionsFixture from './fixtures/questions.json';
import usersFixture from './fixtures/users.json';
import locationsFixture from './fixtures/locations.json';
import departmentsFixture from './fixtures/departments.json';


beforeAll(async () => {
  if (process.env.TEST_MODE === 'integration') {

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
          is_pinned: question.is_anonymous === 0 ? false : true,
          last_email_notification_date: new Date(question.last_email_notification_date),
          createdAt: new Date(question.createdAt),
          updatedAt: new Date(question.createdAt),
        }
      }),
    });

  } else {
    return;
  }
});

afterAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    // Delete in reverse order
    await db.Questions.deleteMany();
    await db.Locations.deleteMany();
    await db.Departments.deleteMany();
    await db.users.deleteMany();
  } else {
    return;
  }
})