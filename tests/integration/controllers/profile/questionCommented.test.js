import { questionCommented } from "~/controllers/profile/questionsCommented"

describe('get questions commented', () => {
    it('get questions commentes succesfully', async() => {
        const payload = {
            userEmail: 'miguel.cardona@wizeline.com',
        }

        const response = await questionCommented(payload);
        expect(response).toBeDefined();
        expect(response.getQuestionCommented.length).toBe(2);
    })

     it('returns an error when the User is not found', async () => {
        const errPayload = {
            userEmail: 'error@wizeline.com',
        }

        const response = await questionCommented(errPayload);
        expect(response).toBeDefined();
        expect(response.error).toBeDefined();
        expect(response.error.message).toBe('The user was not found');
        expect(response.error.detail).toBe('The user was not found');
      });
})
