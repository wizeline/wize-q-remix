import initTestDb from './initTestDb';
import tearDownDb from './tearDownDb';

beforeAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    await initTestDb();
  }
});

afterAll(async () => {
  if (process.env.TEST_MODE === 'integration') {
    await tearDownDb();
  }
});
