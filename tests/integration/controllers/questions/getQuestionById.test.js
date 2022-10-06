import { getQuestionById } from "~/controllers/questions/getQuestionById";
import { db } from "~/utils/db.server";

describe("questions controller", () => {
  describe("get question by id", () => {
    it("returns the question with all aggregated properties", async () => {
      const question = (await getQuestionById(2)).question;
      console.log('The question by id is');
      console.log(question);
      console.log('The question department is');
      console.log(question.Department);
      console.log('Answer');
      console.log(question.Answers[0]);
      expect(true).toBe(false);
    });
  });
});