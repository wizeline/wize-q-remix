import getAnswerById from 'app/controllers/answers/getAnswerById';
import { db } from 'app/utils/db.server';

describe('answers controller', () => {
  describe('getAnswerById', () => {
    const dbFindUniqueSpy = jest.spyOn(db.Answers, 'findUniqueOrThrow');

    it('returns an error when provided invalid id', async () => {
      const response = await getAnswerById('test', {
        id: 'google-oauth2|108653070533260305238',
      });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe(
        'The provided parameters for the operation are not valid',
      );
      expect(response.error.detail).toBe(
        'The answer id must be an integer not minor to 1',
      );
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when not provided user object', async () => {
      const response = await getAnswerById(1);
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe(
        'The provided parameters for the operation are not valid',
      );
      expect(response.error.detail).toBe('Please provide the user object');
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when the answer is not found', async () => {
      const response = await getAnswerById(1001, {
        id: 'google-oauth2|108653070533260305238',
      });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe(
        'An unknown error has occurred with your request.',
      );
      expect(response.error.detail).toBe(
        'An unknown error has occurred with your request.',
      );
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(1);
    });

    it('returns answer correctly', async () => {
      const response = await getAnswerById(2, {
        id: 'google-oauth2|108653070533260305238',
      });
      expect(response).toBeDefined();
      expect(response.answer).toBeDefined();

      const { answer } = response;
      expect(answer.answer_id).toBe(2);
      expect(answer.answer_text).toContain('variations');
      expect(answer.answered_by_employee_id).toBe(2);
      expect(answer.answered_question_id).toBe(3);
      expect(answer.num_scores).toBe(0);
      expect(answer.average_score).toBe(0);
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(2);
    });
  });
});
