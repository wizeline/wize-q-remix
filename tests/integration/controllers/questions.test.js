import { createQuestion } from "~/controllers/questions/create";
import { db } from "~/utils/db.server";

describe("question controllers", () => {
  describe("createQuestion", () => {
    const dbCreateSpy = jest.spyOn(db.Questions, 'create');

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
      expect(response.success).toBeUndefined();
      expect(response.question).toBeUndefined();

      expect(dbCreateSpy).toHaveBeenCalledTimes(0);
  });

    it("creates question with valid data as user", async () => {

        const question = {
          question: '_This_ is a **sample** ~~question~~',
          created_by_employee_id: 1,
          is_anonymous: false,
          assigned_department: 3,
          location: 'BNK'
        };

        const response = await createQuestion(question);

        expect(response).toBeDefined();
        expect(response.success).toBeDefined();
        expect(response.question).toBeDefined();

        expect(dbCreateSpy).toHaveBeenCalled();
    });

    it("creates question with valid data as anonymous", async () => {

      const question = {
        question: '_This_ is a **sample** ~~question~~',
        created_by_employee_id: 1,
        is_anonymous: true,
        assigned_department: 3,
        location: 'BNK'
      };

      const response = await createQuestion(question);

      expect(response).toBeDefined();
      expect(response.success).toBeDefined();
      expect(response.question).toBeDefined();

      expect(dbCreateSpy).toHaveBeenCalled();
  });
  });
});