import { getPendingQuestionsForDepartment } from 'app/controllers/emails/getPendingQuestionsForDepartment';
import createDateRange from 'app/utils/dates/dateUtils';
import { db } from 'app/utils/db.server';

jest.mock('app/utils/dates/dateUtils', () => jest.fn());

describe('getPendingQuestionsForDeparment', () => {
  const dbQuestionListSpy = jest.spyOn(db.questions, 'findMany');

  let results;

  const department = {
    department_id: 1,
  };

  const initialDate = '02-02-2020';
  const lastDate = '03-03-2025';

  createDateRange.mockReturnValue({
    initialDate,
    lastDate,
  });

  beforeAll(async () => {
    results = await getPendingQuestionsForDepartment(department);
  });

  it('calls database for question listing', () => {
    expect(dbQuestionListSpy).toHaveBeenCalledTimes(1);
  });

  it('calls database with default month range', () => {
    expect(createDateRange).toHaveBeenCalledTimes(1);

    expect(dbQuestionListSpy).toHaveBeenCalledWith({
      where: {
        createdat: {
          gte: new Date(initialDate),
          lte: new Date(lastDate),
        },
        answers: expect.any(Object),
        comments: expect.any(Object),
        assigned_department: 1,
        assigned_to_employee_id: null,
      },
    });
  });

  it('uses provided month for date range', async () => {
    await getPendingQuestionsForDepartment(department, -10);
    expect(createDateRange.mock.calls[1][1]).toBe(-10);
  });

  it('returns list of questions', () => {
    expect(results).toBeDefined();
    expect(results.pendingQuestions.length).toEqual(4);
  });
});
