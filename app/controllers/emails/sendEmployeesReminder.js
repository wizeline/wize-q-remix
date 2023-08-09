/* eslint-disable camelcase */
const createDateRange = require('app/utils/dates/dateUtils');
const { db } = require('app/utils/db.server');
const { getPendingQuestionsByEmployeed } = require('app/controllers/emails/getPendingQuestionsByEmployeed');
const { DEFAULT_MONTHS } = require('app/utils/constants');
const { EMAILS } = require('app/utils/emails/emailConstants');
const { getQuestionDetailUrl } = require('app/utils/urls/urlUtils');
const { sendEmail } = require('app/utils/emails/emailHandler');

const sendEmployesReminder = async () => {
  const currentDate = new Date();

  const { initialDate, lastDate } = createDateRange(currentDate, DEFAULT_MONTHS);
  try {
    const employees = await db.questions.findMany({
      where: {
        createdat: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
        answers: { none: {} },
        NOT: [
          {
            assigned_to_employee_id: null,
          },
        ],
      },
      distinct: ['assigned_to_employee_id'],
      select: {
        assigned_to_employee_id: true,
        assigned_to: true,
      },
    });

    if (!employees) {
      return { emailsQueue: [] };
    }

    const reminderEmailProperties = EMAILS.questionPendingReminderByEmployee;
    const { error, questions } = await getPendingQuestionsByEmployeed(employees);

    if (error) {
      return { emailsQueue: [] };
    }

    if (!questions || !questions.length) {
      return { emailsQueue: [] };
    }

    const emails = employees.map(({ assigned_to }) => {
      const {
        email: destinationEmail,
        full_name: destinationName,
        employee_id: employeeId,
      } = assigned_to;

      const questionsByEmployee = questions.filter((q) => q.assigned_to_employee_id === employeeId);

      if (!destinationEmail && !destinationName) {
        return null;
      }

      if (!questionsByEmployee || questions.length === 0) {
        return null;
      }

      const newEmail = {
        to: destinationEmail,
        subject: reminderEmailProperties.subject,
        template: reminderEmailProperties.template,
        context: {
          name: destinationName,
          questions: questionsByEmployee.map(
            (question) => (
              {
                question_text: question.question,
                question_url: getQuestionDetailUrl(question.question_id),
              }
            ),
          ),
        },
      };

      return newEmail;
    });

    const emailsQueue = emails;
    if (emailsQueue) {
      emailsQueue.forEach(async (email) => {
        if (email !== null) await sendEmail(email);
      });
    }

    await db.questions.updateMany({
      where:
      {
        question_id: {
          in: questions.map((q) => q.question_id),
        },
      },
      data: {
        last_email_notification_date: currentDate,
      },
    });

    return { emailsQueue };
  } catch (error) {
    return { error };
  }
};

module.exports = { sendEmployesReminder };
