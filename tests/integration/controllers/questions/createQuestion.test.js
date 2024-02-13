import randomAccessToken from 'tests/utils';
import createQuestion from 'app/controllers/questions/create';
import { db } from 'app/utils/db.server';
import slack from 'app/utils/slack/slackNotifications';
import emailHandler from 'app/utils/emails/emailHandler';
import { EMAILS } from 'app/utils/emails/emailConstants';
import { defaultManagerEmail, defaultManagerName } from 'app/config/emails.json';

describe('createQuestion', () => {
  const dbCreateSpy = jest.spyOn(db.questions, 'create');
  const dbUpdateSpy = jest.spyOn(db.questions, 'update');
  const slackSpy = jest.spyOn(slack, 'createQuestionNotification').mockImplementation();
  const emailHandlerSpy = jest.spyOn(emailHandler, 'sendEmail').mockImplementation();

  afterEach(() => {
    slackSpy.mockClear();
    emailHandlerSpy.mockClear();
  });

  const sampleQuestion = {
    question: '_This_ is a **sample** ~~question~~',
    created_by_employee_id: 1,
    accessToken: randomAccessToken(),
    is_anonymous: false,
    assigned_department: 3,
    location: 'BNK',
  };

  const sampleAnonQuestion = {
    question: '_This_ is a **sample** ~~question~~',
    created_by_employee_id: 1,
    assigned_to_employee_id: 1,
    accessToken: randomAccessToken(),
    is_anonymous: true,
    assigned_department: 3,
    location: 'BNK',
  };

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
    const response = await createQuestion(sampleQuestion);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.question).toBeDefined();
    expect(response.question.is_public).toBe(true);
    expect(response.question.user_hash).toBe('');

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(dbUpdateSpy).toHaveBeenCalledTimes(0);
  });

  it('creates question with valid data as anonymous', async () => {
    const response = await createQuestion(sampleAnonQuestion);

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.question).toBeDefined();
    expect(response.question.is_public).toBe(false);
    expect(response.question.user_hash).not.toBe('');

    expect(dbCreateSpy).toHaveBeenCalled();
    expect(dbUpdateSpy).toHaveBeenCalled();
  });

  it('sets is_public to true if flag is not active', async () => {
    const response = await createQuestion(sampleQuestion, { privateAnonQuestions: true });

    expect(response).toBeDefined();
    expect(response.successMessage).toBeDefined();
    expect(response.question).toBeDefined();
    expect(response.question.is_public).toBe(true);
  });

  it('sends slack notification to admin slack on anon question created if flag is active', async () => {
    const response = await createQuestion(
      sampleAnonQuestion,
      { sendSlackOnQuestionCreation: true },
    );
    expect(response).toBeDefined();
    expect(slackSpy).toHaveBeenCalledTimes(1);
    expect(slackSpy).toHaveBeenCalledWith(expect.objectContaining({
      is_public: false,
    }));
  });

  it('sends slack notification to slack on question created if flag is active', async () => {
    const response = await createQuestion(
      sampleQuestion,
      { sendSlackOnQuestionCreation: true },
      { privateAnonQuestions: true },
    );
    expect(response).toBeDefined();
    expect(slackSpy).toHaveBeenCalledTimes(1);
    expect(slackSpy).toHaveBeenCalledWith(expect.objectContaining({
      is_public: true,
    }));
  });

  it('does not send slack notification on question created if flag is not active', async () => {
    const response = await createQuestion(
      sampleAnonQuestion,
      { sendSlackOnQuestionCreation: false },
    );

    expect(response).toBeDefined();
    expect(slackSpy).toHaveBeenCalledTimes(0);
  });

  it('sends email to manager on question created if flag is active', async () => {
    const response = await createQuestion(
      sampleAnonQuestion,
      { sendEmailToManagerOnQuestionCreation: true },
    );
    expect(response).toBeDefined();
    expect(emailHandlerSpy).toHaveBeenCalledTimes(1);
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

  it('sends email to default user on question created if flag is active and manager not found for department', async () => {
    const response = await createQuestion(
      { ...sampleAnonQuestion, assigned_department: 1 },
      { sendEmailToManagerOnQuestionCreation: true },
    );
    expect(response).toBeDefined();
    expect(emailHandlerSpy).toHaveBeenCalledTimes(1);
    expect(emailHandlerSpy).toHaveBeenCalledWith({
      subject: EMAILS.anonymousQuestionAssigned.subject,
      to: defaultManagerEmail,
      template: EMAILS.anonymousQuestionAssigned.template,
      context: {
        name: defaultManagerName,
        question_text: expect.any(String),
        question_url: expect.any(String),
      },
    });
  });

  it('does not send email on question created if flag is not active', async () => {
    const response = await createQuestion(
      sampleAnonQuestion,
      { sendEmailToManagerOnQuestionCreation: false },
    );

    expect(response).toBeDefined();
    expect(emailHandlerSpy).toHaveBeenCalledTimes(0);
  });
});
