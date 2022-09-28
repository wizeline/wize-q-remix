import { db } from "~/utils/db.server";

beforeAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    const users = await db.users.findMany();
  } else {
    return;
  }
});

afterAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    const users = await db.users.findMany();
  } else {
    return;
  }
})