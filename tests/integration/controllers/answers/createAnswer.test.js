import { createAnswer } from '~/controllers/answers/create';
import { db } from '~/utils/db.server';

describe('createAnswer', () => {
  const dbCreateSpy = jest.spyOn(db.Answers, 'create');

  it('creates valid answer', async () => {
    const answer = {
      answer_text: '_This_ is a **sample** ~~answer~~',
      answered_by_employee_id: 2,
      answered_question_id: 1,
    };

    const response = await createAnswer(answer);

    expect(response).toBeDefined();
    expect(response.success).toBeDefined();
    expect(response.answer).toBeDefined();

    expect(dbCreateSpy).toHaveBeenCalled();
  });
});