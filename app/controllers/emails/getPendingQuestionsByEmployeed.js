/* eslint-disable camelcase */
const { DEFAULT_MONTHS } = require('app/utils/constants');
const createDateRange = require('app/utils/dates/dateUtils');
const { db } = require('app/utils/db.server');
const { subtractOriginalDate } = require('app/utils/dates/timeOperations');
const { managerEmailFrequencyHours } = require('app/config/emails.json');

const getPendingQuestionsByEmployeed = async (employees) => {
  try {
    const currentDate = new Date();
    const previousDate = subtractOriginalDate(currentDate, managerEmailFrequencyHours);
    const { initialDate, lastDate } = createDateRange(currentDate, DEFAULT_MONTHS);
    const pendingQuestions = await db.questions.findMany({
      where: {
        OR: [
          {
            last_email_notification_date: null,
          },
          {
            last_email_notification_date: {
              lte: previousDate,
            },
          },
        ],
        createdAt: {
          lte: new Date(lastDate),
          gte: new Date(initialDate),
        },
        assigned_to_employee_id: {
          in: employees.map((employee) => employee.assigned_to_employee_id),
        },
        Answers: { none: {} },
        Comments: {
          every: {
            approvedBy: null,
          },
        },
      },
    });
    return { questions: pendingQuestions };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getPendingQuestionsByEmployeed,
};
