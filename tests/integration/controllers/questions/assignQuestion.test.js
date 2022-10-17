import { assignQuestion } from "~/controllers/questions/assignQuestion"

describe('assignQuestion', () => {
    it('assign question correctly', async() => {
        const payload = {
            question_id: 4,
            assigned_department: 4,
        }

        const response = await assignQuestion(payload);
        expect(response).toBeDefined();
        expect(response.success).toBeDefined();
        expect(response.assignedQuestion.assigned_department).toEqual(payload.assigned_department);
    })
})
