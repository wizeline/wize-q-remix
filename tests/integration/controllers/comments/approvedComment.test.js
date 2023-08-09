import approvedByComment from 'app/controllers/comments/approvedBy';

describe('approve comment controller', () => {
  it('approve a comment as an answer', async () => {
    const params = {
      questionid: 10,
      commentid: 10,
      employeeid: 1,
      checked: true,
    };
    const response = await approvedByComment(params);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
  });

  it('unmark a comment approved', async () => {
    const params = {
      questionid: 10,
      commentid: 10,
      employeeid: 1,
      checked: true,
    };
    const response = await approvedByComment(params);
    expect(response.successMessage).toBeDefined();

    params.checked = false;

    const responseUnmark = await approvedByComment(params);
    expect(responseUnmark).toBeDefined();
    expect(responseUnmark.successMessage).toBeDefined();
  });

  it('error when question has a comment approved as an answer', async () => {
    const params = {
      questionid: 9,
      commentid: 6,
      employeeid: 1,
      checked: true,
    };
    const response = await approvedByComment(params);
    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
  });
});
