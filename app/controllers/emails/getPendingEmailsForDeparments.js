const { getPendingQuestionsForDepartment } = require('app/controllers/emails/getPendingQuestionsForDepartment');
const { EMAILS } = require('app/utils/emails/emailConstants');
const { getQuestionDetailUrl } = require('app/utils/urls/urlUtils');

const getPendingEmailsForDepartments = async (departments) => {
  try {
    if (!departments) {
      return [];
    }

    const reminderEmailProperties = EMAILS.questionPendingReminder;
    const promises = departments.map(async (department) => {
      const { error, pendingQuestions } = await getPendingQuestionsForDepartment(department);

      if (error) {
        return null;
      }

      if (!pendingQuestions || !pendingQuestions.length) {
        return null;
      }

      const hasManagerEmail = department.managerdepartmet && department.managerdepartmet.email;
      const hasAlternateManagerEmail = department.alternatemanager
        && department.alternatemanager.email;

      const destination = [];
      if (hasManagerEmail) {
        destination.push(department.managerdepartmet.email);
      }
      if (hasAlternateManagerEmail) {
        destination.push(department.alternatemanager.email);
      }

      if (destination.length === 0) return null;

      const newEmail = {
        to: destination.join(','),
        subject: reminderEmailProperties.subject,
        template: reminderEmailProperties.template,
        context: {
          department_name: department.name,
          questions: pendingQuestions.map(
            (question) => ({
              question_text: question.question,
              question_url: getQuestionDetailUrl(question.question_id),
            }),
          ),
        },
      };

      return newEmail;
    });

    const emailsQueue = await Promise.all(promises);
    return { emailsQueue: emailsQueue.filter((email) => email !== null) };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getPendingEmailsForDepartments,
};
