/* eslint-disable camelcase */
const createDateRange = require('app/utils/backend/dateUtils');
const { db } = require('app/utils/db.server');
const { getPendingQuestionsByEmployeed } = require('app/controllers/emails/getPendingQuestionsByEmployeed');
const { DEFAULT_MONTHS } = require('app/utils/backend/constants');
const { EMAILS } = require('app/utils/backend/emails/emailConstants');
const { getQuestionDetailUrl } = require('app/utils/backend/urlUtils');
const { sendEmail } = require('app/utils/backend/emails/emailHandler');

const sendEmployesReminder = async () => {
  const currentDate = new Date();

  const { initialDate, lastDate } = createDateRange(currentDate, DEFAULT_MONTHS);
  try {
    const employees = await db.Questions.findMany({
      where: {
        createdAt: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
        Answers: { none: {} },
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

    const promises = employees.map(({ assigned_to }) => {
      const {
        email: destinationEmail,
        full_name: destinationName,
        employee_id: employeeId,
      } = assigned_to;

      const questionsByEmployee = questions.filter((q) => q.assigned_to_employee_id === employeeId);

      if (!destinationEmail && !destinationName) {
        return null;
      }

      if (!questionsByEmployee) {
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

    const emailsQueue = promises;
    if (emailsQueue) {
      emailsQueue.forEach(async (email) => {
        await sendEmail(email);
      });
    }

    await db.Questions.updateMany({
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
