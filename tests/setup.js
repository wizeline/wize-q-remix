import initTestDb from "./initTestDb";
import tearDownDb from "./tearDownDb";

beforeAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    await initTestDb();
  } else {
    return;
  }
});

afterAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    await tearDownDb();
  } else {
    return;
  }
})
