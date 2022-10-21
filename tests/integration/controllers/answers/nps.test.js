import { nps } from "~/controllers/answers/nps";

describe('nps', () => {
    it('scored correctly', async() => {
        const payload = {
            id: 1,
            score: 4,
        }

        const response = await nps(payload);
        expect(response).toBeDefined();
        expect(response.success).toBeDefined();
        expect(response.scored.score).toEqual(payload.score);
    })

    it('returns an error when the question is not found', async () => {
        const errPayload = {
            id: 11,
            score: 4,
        }
        
        const response = await nps(errPayload);
        expect(response).toBeDefined();
        expect(response.error).toBeDefined();
        expect(response.error.message).toBe('Answer not found');
        expect(response.error.detail).toBe('Answer not found');
      });
})
