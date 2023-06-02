import { getPendingQuestionsForDepartment } from 'app/controllers/emails/getPendingQuestionsForDepartment';
import createDateRange from 'app/utils/backend/dateUtils';
import { db } from 'app/utils/db.server';

jest.mock('app/utils/backend/dateUtils', () => jest.fn());

describe('getPendingQuestionsForDeparment', () => {
  const dbQuestionListSpy = jest.spyOn(db.Questions, 'findMany');

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
        createdAt: {
          gte: new Date(initialDate),
          lte: new Date(lastDate),
        },
        Answers: expect.any(Object),
        Comments: expect.any(Object),
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
