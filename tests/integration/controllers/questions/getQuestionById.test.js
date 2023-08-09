import getQuestionById from 'app/controllers/questions/getQuestionById';
import { db } from 'app/utils/db.server';

describe('questions controller', () => {
  describe('get question by id', () => {
    const dbFindUniqueSpy = jest.spyOn(db.questions, 'findUnique');

    it('returns an error when provided invalid id', async () => {
      const response = await getQuestionById('test', { id: 'google-oauth2|108653070533260305238' });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe('The provided parameters for the operation are not valid');
      expect(response.error.detail).toBe('The question id must be an integer not minor to 1');
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when not provided user object', async () => {
      const response = await getQuestionById(1);
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe('The provided parameters for the operation are not valid');
      expect(response.error.detail).toBe('Please provide the user object');
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when the question is not found', async () => {
      const response = await getQuestionById(1001, { id: 'google-oauth2|108653070533260305238' });
      expect(response).toBeDefined();
      expect(response.error).toBeDefined();
      expect(response.error.message).toBe('The question with the id provided could not be found');
      expect(response.error.detail).toBe('The question with the id provided could not be found');
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(1);
    });

    it('returns the question with all aggregated properties', async () => {
      const response = await getQuestionById(2, { id: 'google-oauth2|108653070533260305238' });
      expect(response).toBeDefined();
      expect(response.question).toBeDefined();

      const { question } = response;
      expect(question.question_id).toBe(2);
      expect(question.question).toContain('Testing');
      expect(question.is_anonymous).toBe(false);
      expect(question.location).toBe('ALL');
      expect(question.num_votes).toBe(1);
      expect(question.hasVoted).toBe(true);
      expect(question.created_by).toBeDefined();
      expect(question.created_by.employee_id).toBe(1);
      expect(question.created_by.full_name).toBe('Patrick Shu');
      expect(question.answers).toBeDefined();
      expect(question.answer.answer_id).toBe(1);
      expect(question.answer.answer_text).toContain('Testing admin answer');
      expect(question.answer.hasScored).toBe(true);
      expect(question.department).toBeDefined();
      expect(question.department.name).toBe('CEO / Exec Staff');
      expect(dbFindUniqueSpy).toHaveBeenCalledTimes(2);
    });
  });
});
