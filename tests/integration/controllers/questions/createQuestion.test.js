import { randomAccessToken } from "../../../utils";
import { createQuestion } from "~/controllers/questions/create";
import { db } from "~/utils/db.server";
import slack from '~/utils/backend/slackNotifications';

  describe("createQuestion", () => {
    const dbCreateSpy = jest.spyOn(db.Questions, 'create');
    const dbUpdateSpy = jest.spyOn(db.Questions, 'update');
    const slackSpy = jest.spyOn(slack, "createQuestionNotification").mockImplementation();

    it("returns error when inavlid parameters passed", async () => {

      const question = {
        question: [],
        created_by_employee_id: 1,
        is_anonymous: "false",
        location: 'BNK'
      };

      const response = await createQuestion(question);

      expect(response).toBeDefined();
      expect(response.errors).toBeDefined();
      expect(response.successMessage).toBeUndefined();
      expect(response.question).toBeUndefined();

      expect(dbCreateSpy).toHaveBeenCalledTimes(0);
  });

    it("creates question with valid data as user", async () => {

        const question = {
          question: '_This_ is a **sample** ~~question~~',
          created_by_employee_id: 1,
          accessToken: randomAccessToken(),
          is_anonymous: false,
          assigned_department: 3,
          location: 'BNK'
        };

        const response = await createQuestion(question);

        expect(response).toBeDefined();
        expect(response.successMessage).toBeDefined();
        expect(response.question).toBeDefined();
        expect(response.question.user_hash).toBe('');

        expect(dbCreateSpy).toHaveBeenCalled();
        expect(dbUpdateSpy).toHaveBeenCalledTimes(0);

        expect(slackSpy).toHaveBeenCalled();
    });

    it("creates question with valid data as anonymous", async () => {

      const question = {
        question: '_This_ is a **sample** ~~question~~',
        created_by_employee_id: 1,
        accessToken: randomAccessToken(),
        is_anonymous: true,
        assigned_department: 3,
        location: 'BNK'
      };

      const response = await createQuestion(question);

      expect(response).toBeDefined();
      expect(response.successMessage).toBeDefined();
      expect(response.question).toBeDefined();
      expect(response.question.user_hash).not.toBe('');

      expect(dbCreateSpy).toHaveBeenCalled();
      expect(dbUpdateSpy).toHaveBeenCalled();

      expect(slackSpy).toHaveBeenCalled();

  });
});