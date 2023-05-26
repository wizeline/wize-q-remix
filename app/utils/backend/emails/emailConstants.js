export const EMAIL_SUBJECT_PREFIX = 'Wizeline Questions - ';

export const EMAILS = {
  anonymousQuestionAssigned: {
    subject: 'A new anonymous question assigned to you',
    template: 'anonymousQuestionAssigned',
  },
  publicQuestionAssigned: {
    subject: 'A new question assigned to you',
    template: 'publicQuestionAssigned',
  },
  questionPendingReminder: {
    subject: '[Reminder] List of questions missing an answer',
    template: 'questionPendingReminder',
  },
  questionPendingReminderByEmployee: {
    subject: '[Reminder] List of questions missing an answer',
    template: 'questionPendingReminderByEmployee',
  },
};
