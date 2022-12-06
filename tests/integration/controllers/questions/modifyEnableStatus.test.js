import { createQuestion } from "~/controllers/questions/create";
import { randomAccessToken } from "./../../../utils";
import {
  ENABLE_DISABLE_ERROR_MESSAGE,
  INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE,
  QUESTION_NOT_FOUND_ERROR_MESSAGE,
} from "~/utils/constants";
import { db } from "~/utils/db.server";
import {getFormattedDate } from '~/utils/dateFormat';
import { modifyEnabledValue } from "~/controllers/questions/modifyEnableStatus";

describe("questions controller", () => {
  describe("Modify is_enabled status of a question ", () => {
    const dbUpdateSpy = jest.spyOn(db.Questions, "update");

    test("returns error when provided no parameters", async () => {
      const response = await modifyEnabledValue();

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(ENABLE_DISABLE_ERROR_MESSAGE);
      expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    });

    test("returns error when provided invalid parameters", async () => {
      const response = await modifyEnabledValue("test", 1);

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(ENABLE_DISABLE_ERROR_MESSAGE);
      expect(response.error.detail).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
    });

    test("returns error when question id not found", async () => {
      const response = await modifyEnabledValue(1000, true);

      expect(response.error).toBeDefined();
      expect(response.error.message).toBeDefined();
      expect(response.error.detail).toBeDefined();
      expect(response.error.message).toBe(ENABLE_DISABLE_ERROR_MESSAGE);
      expect(response.error.detail).toBe(QUESTION_NOT_FOUND_ERROR_MESSAGE);
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();
      expect(dbUpdateSpy).toHaveBeenCalledTimes(1);
    });

    test("modifies the enabled status to true successfully", async () => {
      const question = {
        question: "_This_ is a **sample** ~~question~~",
        created_by_employee_id: 1,
        accessToken: randomAccessToken(),
        is_anonymous: false,
        assigned_department: 3,
        location: "BNK",
      };

      const createQuestionResponse = await createQuestion(question);
      expect(createQuestionResponse.error).toBeUndefined();
      expect(createQuestionResponse).toBeDefined();
      expect(createQuestionResponse.successMessage).toBeDefined();
      expect(createQuestionResponse.question).toBeDefined();
      expect(createQuestionResponse.question.question_id).toBeDefined();
      expect(createQuestionResponse.question.is_enabled).toBeDefined();
      expect(createQuestionResponse.question.is_enabled).toBe(true);

      const response = await modifyEnabledValue(createQuestionResponse.question.question_id, false);

      expect(response.successMessage).toBeDefined();
      expect(response.error).toBeUndefined();
      expect(response.question).toBeDefined();
      expect(response.successMessage).toContain('The question has been disabled');
      expect(response.question.is_enabled).toBeDefined();
      expect(response.question.is_enabled).toBe(false);
      expect(dbUpdateSpy).toHaveBeenCalledTimes(2);
    });
    
    test('return the current date in the updatedAt field when updating a question', async () => {
      const response = await modifyEnabledValue(1, true);
      expect(response.error).toBeUndefined();
      expect(response.successMessage).toBeDefined();
      expect(response.question).toBeDefined();
      expect(response.successMessage).toContain('The question has been enabled');
      expect(response.question.is_enabled).toBeDefined();
      expect(response.question.is_enabled).toBe(true);
      expect(getFormattedDate(response.question.updatedAt)).toEqual(getFormattedDate(new Date()));
    });

  });
});
