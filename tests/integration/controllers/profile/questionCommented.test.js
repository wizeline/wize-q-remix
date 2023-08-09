import questionCommented from 'app/controllers/profile/questionsCommented';

describe('get questions commented', () => {
  it('get questions commentes succesfully', async () => {
    const payload = {
      useremail: 'miguel.cardona@wizeline.com',
    };

    const response = await questionCommented(payload);
    expect(response).toBeDefined();
    expect(response.questions.length).toBe(2);
  });

  it('returns an error when the User is not found', async () => {
    const errPayload = {
      useremail: 'error@wizeline.com',
    };

    const response = await questionCommented(errPayload);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBe(`The user: ${errPayload.useremail} was not found`);
    expect(response.error.detail).toBe(`The user: ${errPayload.useremail} was not found`);
  });
});
