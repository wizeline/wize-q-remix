import { getPendingEmailsForDepartments } from 'app/controllers/emails/getPendingEmailsForDeparments';
import { getPendingQuestionsForDepartment } from 'app/controllers/emails/getPendingQuestionsForDepartment';

jest.mock('app/controllers/emails/getPendingQuestionsForDepartment');

describe('getPendingEmailsForDeparments', () => {
  const mockValidDepartments = [
    {
      AlternateManager: {
        email: 'alternate@mail.com',
      },
      ManagerDepartmet: {
        email: 'manager@mail.com',
      },
    },
    {
      AlternateManager: {
        email: 'alternate@mail.com',
      },
    },
    {
      ManagerDepartmet: {
        email: 'manager@mail.com',
      },
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls getPendingQuestionsForDeparment for each department', async () => {
    getPendingQuestionsForDepartment.mockReturnValue({ pendingQuestions: [{}, {}] });
    await getPendingEmailsForDepartments(mockValidDepartments);
    expect(getPendingQuestionsForDepartment.mock.calls.length).toEqual(mockValidDepartments.length);
  });

  it('returns empty array when no departments provided', async () => {
    const results = await getPendingEmailsForDepartments([]);
    expect(results.length).toEqual(0);
  });

  it('filters out departments that do not have an assigned manager or alternate manager', async () => {
    getPendingQuestionsForDepartment.mockReturnValue({ pendingQuestions: [{}, {}] });
    const results = await getPendingEmailsForDepartments(
      [
        ...mockValidDepartments,
        {
          ManagerDepartmet: {
            email: undefined,
          },
        },
        {
          AlternateManager: {
            email: undefined,
          },
        },
        {
          AlternateManager: {
            email: undefined,
          },
          ManagerDepartmet: {
            email: undefined,
          },
        },
        {
          AlternateManager: undefined,
          ManagerDepartmet: undefined,
        },
      ],
    );
    expect(results.length).toEqual(3);
  });

  it('filters out departments that do not have pending questions', async () => {
    getPendingQuestionsForDepartment.mockReturnValueOnce({ pendingQuestions: [{}, {}] })
      .mockReturnValueOnce({ pendingQuestions: [] }).mockReturnValueOnce({ pendingQuestions: [] });
    const results = await getPendingEmailsForDepartments(mockValidDepartments);
    expect(results.length).toEqual(1);
  });

  it('builds email data for department', async () => {
    getPendingQuestionsForDepartment.mockReturnValue({
      pendingQuestions: [{
        question_id: 1,
        question: 'Test question',
        question_url: 'https://questions.wizeline.com/1',
      }],
    });
    const results = await getPendingEmailsForDepartments(mockValidDepartments);
    const emailData = results[0];
    expect(emailData.to).toEqual('manager@mail.com,alternate@mail.com');
    expect(emailData.context.questions.length).toEqual(1);
    expect(emailData.context.questions[0].question_text).toEqual('Test question');
    expect(emailData.context.questions[0].question_url).toContain('questions/1');
  });
});