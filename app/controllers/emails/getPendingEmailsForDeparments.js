const { getPendingQuestionsForDepartment } = require('app/controllers/emails/getPendingQuestionsForDepartment');
const { EMAILS } = require('app/utils/backend/emails/emailConstants');
const { getQuestionDetailUrl } = require('app/utils/backend/urlUtils');

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

      const hasManagerEmail = department.ManagerDepartmet && department.ManagerDepartmet.email;
      const hasAlternateManagerEmail = department.AlternateManager
        && department.AlternateManager.email;

      if (!hasManagerEmail && !hasAlternateManagerEmail) {
        return null;
      }

      const destination = [];
      if (hasManagerEmail) {
        destination.push(department.ManagerDepartmet.email);
      }
      if (hasAlternateManagerEmail) {
        destination.push(department.AlternateManager.email);
      }

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
