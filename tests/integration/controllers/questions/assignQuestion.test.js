import assignQuestion from 'app/controllers/questions/assignQuestion';
import emailHandler from 'app/utils/backend/emails/emailHandler';
import { EMAILS } from 'app/utils/backend/emails/emailConstants';

describe('assignQuestion', () => {
  const emailHandlerSpy = jest.spyOn(emailHandler, 'sendEmail').mockImplementation();

  afterEach(() => {
    emailHandlerSpy.mockClear();
  });

  it('assign question correctly', async () => {
    const payload = {
      question_id: 4,
      assigned_department: 4,
      assigned_to_employee_id: 4,
    };

    const response = await assignQuestion(payload);
    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.assignedQuestion.assigned_department).toEqual(payload.assigned_department);
  });

  it('sends email to the new person assigned', async () => {
    const payload = {
      question_id: 4,
      assigned_department: 4,
      assigned_to_employee_id: 4,
    };
    const response = await assignQuestion(payload);
    expect(response).toBeDefined();
    expect(emailHandlerSpy).toHaveBeenCalledTimes(1);
    expect(emailHandlerSpy).toHaveBeenCalledWith({
      subject: EMAILS.publicQuestionAssigned.subject,
      to: 'eduardo.garibo@wizeline.com',
      template: EMAILS.publicQuestionAssigned.template,
      context: {
        name: 'Eduardo Mendoza Garibo',
        question_text: expect.any(String),
        question_url: expect.any(String),
      },
    });
  });

  it('returns an error when the question is not found', async () => {
    const errPayload = {
      question_id: 11,
      assigned_department: 4,
      assigned_to_employee_id: 4,
    };

    const response = await assignQuestion(errPayload);
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBe('The question with the id provided could not be found');
    expect(response.error.detail).toBe('The question with the id provided could not be found');
  });
});
