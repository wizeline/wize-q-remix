const { getPendingEmailsForDepartments } = require('app/controllers/emails/getPendingEmailsForDeparments');
const { sendEmail } = require('app/utils/emails/emailHandler');
const { db } = require('app/utils/db.server');
const { subtractOriginalDate } = require('app/utils/dates/timeOperations');
const { managerEmailFrequencyHours } = require('app/config/emails.json');

const sendManagerReminder = async (
  currentDate = new Date(),
  emailFrequency = managerEmailFrequencyHours,
) => {
  const originalDate = currentDate;
  const previousDate = subtractOriginalDate(originalDate, emailFrequency);

  try {
    const departments = await db.departments.findMany({
      where: {
        is_active: true,
        OR: [
          {
            last_manager_email_notification_date: {
              lte: previousDate,
            },
          },
          {
            last_manager_email_notification_date: null,
          },
        ],
      },
      include: { managerdepartmet: true, alternatemanager: true },
    });

    if (!departments) {
      return { emailsQueue: [] };
    }

    const { error, emailsQueue } = await getPendingEmailsForDepartments(departments);
    if (error) return { emailsQueue: [] };

    emailsQueue.forEach(async (email) => {
      await sendEmail(email);
    });

    await db.departments.updateMany({
      where: {
        department_id: {
          in: departments.map((dep) => dep.department_id),
        },
      },
      data: {
        last_manager_email_notification_date: originalDate,
      },
    });

    return { emailsQueue };
  } catch (error) {
    return { error };
  }
};

module.exports = { sendManagerReminder };
