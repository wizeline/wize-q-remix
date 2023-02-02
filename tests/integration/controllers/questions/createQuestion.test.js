import randomAccessToken from 'tests/utils';
import createQuestion from 'app/controllers/questions/create';
import { db } from 'app/utils/db.server';
import slack from 'app/utils/backend/slackNotifications';
import { EMAILS } from 'app/utils/backend/emails/emailConstants';
import emailHandler from 'app/utils/backend/emails/emailHandler';

describe('createQuestion', () => {
  const dbCreateSpy = jest.spyOn(db.Questions, 'create');
  const dbUpdateSpy = jest.spyOn(db.Questions, 'update');
  const slackSpy = jest.spyOn(slack, 'createQuestionNotification').mockImplementation();
  const emailHandlerSpy = jest.spyOn(emailHandler, 'sendEmail').mockImplementation();

  afterEach(() => {
    dbCreateSpy.mockClear();
    slackSpy.mockClear();
    emailHandlerSpy.mockClear();
  });

  it('returns error when inavlid parameters passed', async () => {
    const question = {
      question: [],
      created_by_employee_id: 1,
      is_anonymous: 'false',
      location: 'BNK',
    };

    const response = await createQuestion(question);

    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
    expect(response.successMessage).toBeUndefined();
    expect(response.question).toBeUndefined();

    expect(dbCreateSpy).toHaveBeenCalledTimes(0);
  });

  it('creates question with valid data as user', async () => {
    const question = {
      question: '_This_ is a **sample** ~~question~~',
      created_by_employee_id: 1,
      accessToken: randomAccessToken(),
      is_anonymous: false,
      assigned_department: 3,
      location: 'BNK',
    };

    const response = await createQuestion(question);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.question).toBeDefined();
    expect(response.question.is_public).toBe(true);
    expect(response.question.user_hash).toBe('');

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(dbUpdateSpy).toHaveBeenCalledTimes(0);

    expect(slackSpy).toHaveBeenCalled();
    expect(emailHandlerSpy).toHaveBeenCalledTimes(0);
  });

  it('require assigned employee on anonymous question', async () => {
    const question = {
      question: '_This_ is a **sample** ~~question~~',
      created_by_employee_id: 1,
      accessToken: randomAccessToken(),
      is_anonymous: true,
      assigned_department: 3,
      location: 'BNK',
    };

    const response = await createQuestion(question);

    expect(response).toBeDefined();
    expect(response.errors).toBeDefined();
    expect(response.successMessage).toBeUndefined();
    expect(response.question).toBeUndefined();

    expect(dbCreateSpy).toHaveBeenCalledTimes(0);
    expect(emailHandlerSpy).toHaveBeenCalledTimes(0);
  });

  it('creates question with valid data as anonymous', async () => {
    const question = {
      question: '_This_ is a **sample** ~~question~~',
      created_by_employee_id: 1,
      assigned_to_employee_id: 1,
      accessToken: randomAccessToken(),
      is_anonymous: true,
      assigned_department: 3,
      location: 'BNK',
    };

    const response = await createQuestion(question);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.question).toBeDefined();
    expect(response.question.is_public).toBe(false);
    expect(response.question.user_hash).not.toBe('');

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(dbUpdateSpy).toHaveBeenCalled();

    // Do not send slack message on anonymous question
    expect(slackSpy).toHaveBeenCalledTimes(0);

    expect(emailHandlerSpy).toHaveBeenCalled();
    expect(emailHandlerSpy).toHaveBeenCalledWith({
      subject: EMAILS.anonymousQuestionAssigned.subject,
      to: 'patrick.shu@wizeline.com',
      template: EMAILS.anonymousQuestionAssigned.template,
      context: {
        name: 'Patrick Shu',
        question_text: expect.any(String),
        question_url: expect.any(String),
      },
    });
  });
});
