import { getQuestionsCreated } from "~/controllers/profile/questionsCreated";

describe('profile controllers', () => { 
  it('get questions created', async() => { 
    const user = {
      "employee_id": 2,
    }
    const response = await getQuestionsCreated(user);
    expect(response).toBeDefined();
    expect(response.length).toBe(4);
  })
})