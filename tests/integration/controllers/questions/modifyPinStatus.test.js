import modifyPinStatus from 'app/controllers/questions/modifyPinStatus';
import createQuestion from 'app/controllers/questions/create';
import randomAccessToken from 'tests/utils';
import {
  PIN_QUESTION_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from 'app/utils/constants';
import { db } from 'app/utils/db.server';
import getFormattedDate from 'app/utils/dateFormat';

describe('questions controller', () => {
  describe('Modify pin status of a question (modifyPinStatus)', () => {
    const dbUpdateSpy = jest.spyOn(db.Questions, 'update');

    it('returns error when provided no parameters', async () => {
      const response = await modifyPinStatus();

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
      expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    });

    it('returns error when provided invalid parameters', async () => {
      const response = await modifyPinStatus('test', 1);

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
      expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    });

    it('returns error when question id not found', async () => {
      const response = await modifyPinStatus(1000, true);

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(PIN_QUESTION_ERROR_MESSAGE);
      expect(response.error.detail).toBe(QUESTION_NOT_FOUND_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
    });

    it('modifies the pin status to true successfully', async () => {
      const question = {
        question: '_This_ is a **sample** ~~question~~',
        created_by_employee_id: 1,
        accessToken: randomAccessToken(),
        is_anonymous: false,
        assigned_department: 3,
        location: 'BNK',
      };

      const createQuestionResponse = await createQuestion(question);

      expect(createQuestionResponse).toBeDefined();
      expect(createQuestionResponse.errors).toBeUndefined();
      expect(createQuestionResponse.successMessage).toBeDefined();
      expect(createQuestionResponse.question).toBeDefined();
      expect(createQuestionResponse.question.question_id).toBeDefined();
      expect(createQuestionResponse.question.is_pinned).toBeDefined();
      expect(createQuestionResponse.question.is_pinned).toBe(false);

      const response = await modifyPinStatus(createQuestionResponse.question.question_id, true);

      expect(response.error).toBeUndefined();
      expect(response.successMessage).toBeDefined();
      expect(response.question).toBeDefined();
      expect(response.successMessage).toContain('The question has been pinned');
      expect(response.question.is_pinned).toBeDefined();
      expect(response.question.is_pinned).toBe(true);
      expect(dbUpdateSpy).toHaveBeenCalledTimes(2);
    });

    it('return the current date in the updatedAt field when updating a question', async () => {
      const response = await modifyPinStatus(1, true);
      expect(response.error).toBeUndefined();
      expect(response.successMessage).toBeDefined();
      expect(response.question).toBeDefined();
      expect(response.successMessage).toContain('The question has been pinned');
      expect(response.question.is_pinned).toBeDefined();
      expect(response.question.is_pinned).toBe(true);
      expect(getFormattedDate(response.question.updatedAt)).toEqual(getFormattedDate(new Date()));
    });
  });
});
