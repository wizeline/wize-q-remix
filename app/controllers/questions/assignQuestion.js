/* eslint-disable camelcase */
import { DEFAULT_ERROR_MESSAGE, QUESTION_NOT_FOUND_ERROR_MESSAGE } from 'app/utils/constants';
import { assignQuestionSchema } from 'app/utils/validators/question';
import { db } from 'app/utils/db.server';
import { EMAILS } from 'app/utils/emails/emailConstants';
import { getQuestionDetailUrl } from 'app/utils/urls/urlUtils';
import { sendEmail } from 'app/utils/emails/emailHandler';
import { sendEmailOnQuestionReassigned } from 'app/config/flags.json';
import { defaultManagerEmail, defaultManagerName } from 'app/config/emails.json';

const assignQuestion = async (
  query,
  config = { sendEmailOnQuestionReassigned },
) => {
  const { error, value } = assignQuestionSchema.validate(query);
  const { question_id, assigned_department, assigned_to_employee_id } = value; 

  if (error) {
console.log('error - ', error);
    return { errors: [{ message: DEFAULT_ERROR_MESSAGE, detail: error.details }] };
  }

  try {
    const assignedQuestion = await db.questions.update({
      where: { question_id },
      data: {
        assigned_department,
        assigned_to_employee_id,
      },
    });

    if (config.sendEmailOnQuestionReassigned) {
      const user = await db.users.findUnique({
        where:
       {
         employee_id: assigned_to_employee_id,
       },
      });

      const destinationEmail = user && user.email !== undefined ? user.email : defaultManagerEmail;
      const destinationName = user && user.full_name !== undefined
        ? user.full_name : defaultManagerName;

      const emailProperties = assignedQuestion.is_anonymous
        ? EMAILS.anonymousQuestionAssigned
        : EMAILS.publicQuestionAssigned;

      await sendEmail({
        to: destinationEmail,
        subject: emailProperties.subject,
        template: emailProperties.template,
        context: {
          name: destinationName,
          question_url: getQuestionDetailUrl(assignedQuestion.question_id),
          question_text: assignedQuestion.question,
        },
      });
    }
    return {
      successMessage: 'The question department has been reassigned successfully',
      assignedQuestion,
    };
  } catch (_error) {
    return {
      error: {
        message: QUESTION_NOT_FOUND_ERROR_MESSAGE,
        detail: QUESTION_NOT_FOUND_ERROR_MESSAGE,
      },
    };
  }
};

export default assignQuestion;
