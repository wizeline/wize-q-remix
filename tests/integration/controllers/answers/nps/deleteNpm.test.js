import deleteNPS from 'app/controllers/answers/nps/delete';

describe('nps delete controller', () => {
  it('delete the nps from an answer', async () => {
    const params = {
      id: 3,
      user: { id: 'google-oauth2|111766391199351256706' },
    };
    const response = await deleteNPS(params);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
  });
  it('error when the netscore not exist', async () => {
    const params = { id: 10, user: { id: 'google-oauth2|111766391199351256706' } };
    const response = await deleteNPS(params);
    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
  });

  it('error when the id is not a number', async () => {
    const params = { id: 'number', user: { id: 'google-oauth2|111766391199351256706' } };
    const response = await deleteNPS(params);
    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
  });
});
