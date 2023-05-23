import { db } from 'app/utils/db.server';
import { sendEmail } from 'app/utils/backend/emails/emailHandler';
import { sendManagerReminder } from 'app/controllers/emails/sendManagerReminder';
import { getPendingEmailsForDepartments } from 'app/controllers/emails/getPendingEmailsForDeparments';
import { EMAILS } from 'app/utils/backend/emails/emailConstants';

jest.mock('app/controllers/emails/getPendingEmailsForDeparments');
jest.mock('app/utils/backend/emails/emailHandler');

describe('sendReminder', () => {
  const dbDepartmentsListSpy = jest.spyOn(db.Departments, 'findMany');
  const dbDepartmentsUpdateSpy = jest.spyOn(db.Departments, 'updateMany');

  const mockEmails = [
    {
      to: 'test@mail.com, test2@mail.com',
      subject: EMAILS.questionPendingReminder.subject,
      template: EMAILS.questionPendingReminder.template,
    },
  ];

  let emails;
  let error;

  getPendingEmailsForDepartments.mockReturnValue(mockEmails);
  sendEmail.mockReturnValue(undefined);

  const currentDateMock = new Date('2011-04-11T10:20:30Z');

  beforeAll(async () => {
    const response = await sendManagerReminder(
      currentDateMock,
      2,
    );
    emails = response.emailsQueue;
    error = response.error;
  });

  it('does not return error', () => {
    expect(error).toBeUndefined();
  });

  it('calls database for deparment listing', () => {
    expect(dbDepartmentsListSpy).toHaveBeenCalledTimes(1);
  });

  it('uses previous date with offset to check for last notification timedate', () => {
    const mockCall = dbDepartmentsListSpy.mock.calls[0][0];
    const { last_manager_email_notification_date: lastDate } = mockCall.where.OR[0];
    expect(lastDate.lte).toBeDefined();
    expect(lastDate.lte.getTime()).toBeLessThan(currentDateMock.getTime());
  });

  it('calls pending emails for active deparments', () => {
    expect(getPendingEmailsForDepartments).toHaveBeenCalledTimes(1);
    const departmentsList = getPendingEmailsForDepartments.mock.calls[0][0];
    expect(departmentsList.length).toEqual(20);
  });

  it('sends email list', async () => {
    expect(sendEmail).toHaveBeenCalledTimes(mockEmails.length);
    expect(sendEmail).toHaveBeenNthCalledWith(1, mockEmails[0]);
  });

  it('returns emails queue', () => {
    expect(emails).toEqual(mockEmails);
  });

  it('updates notification email date column for all departments', () => {
    expect(dbDepartmentsUpdateSpy).toHaveBeenCalledTimes(1);
    expect(dbDepartmentsUpdateSpy).toHaveBeenCalledWith({
      where: expect.any(Object),
      data: {
        last_manager_email_notification_date: currentDateMock,
      },
    });
  });
});
