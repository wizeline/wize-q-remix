import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';
import generateSessionIdHash from 'app/utils/crypto';
import slack from 'app/utils/slack/slackNotifications';
import { stripNewLines, truncate } from 'app/utils/strings/stringUtils';
import sanitizeHTML from 'app/utils/strings/sanitizer';
import { createQuestionSchema } from 'app/utils/validators/question';
import { db } from 'app/utils/db.server';
import { SLACK_QUESTION_LIMIT } from 'app/utils/slack/slackConstants';
import { EMAILS } from 'app/utils/emails/emailConstants';
import { getQuestionDetailUrl } from 'app/utils/urls/urlUtils';
import { sendEmail } from 'app/utils/emails/emailHandler';
import { sendEmailToManagerOnQuestionCreation, sendSlackOnQuestionCreation } from 'app/config/flags.json';
import { defaultManagerEmail, defaultManagerName } from 'app/config/emails.json';

const createQuestion = async (
  body,
  config = { sendEmailToManagerOnQuestionCreation, sendSlackOnQuestionCreation },
) => {
  const { error, value } = createQuestionSchema.validate(body);
  console.log('BODY VALIDATED');
  if (error) {
    return {
      errors: [
        {
          message: DEFAULT_ERROR_MESSAGE,
          detail: error,
        },
      ],
    };
  }

  const { accessToken, ...rest } = value;

  let created = await db.Questions.create({
    data: {
      ...rest,
      question: sanitizeHTML(value.question),
    },
  });

  if (value.is_anonymous) {
    const sessionHash = generateSessionIdHash(accessToken, created.question_id);

    created = await db.Questions.update({
      where: {
        question_id: created.question_id,
      },
      data: {
        user_hash: sessionHash,
      },
    });
  }

  if (config.sendSlackOnQuestionCreation) {
    await slack.createQuestionNotification({
      questionBody: stripNewLines(truncate(value.question), SLACK_QUESTION_LIMIT),
      questionId: created.question_id,
    });
  }

  if (config.sendEmailToManagerOnQuestionCreation) {
    let departmentManager;

    if (created.assigned_department) {
      departmentManager = (await db.Departments.findUnique(({
        where: {
          department_id: created.assigned_department,
        },
        include: { ManagerDepartmet: true, AlternateManager: true },
      })));
    }
    const { ManagerDepartmet, AlternateManager } = departmentManager;

    const destinationEmail = ManagerDepartmet ? ManagerDepartmet.email : defaultManagerEmail;
    const destinationName = ManagerDepartmet ? ManagerDepartmet.full_name : defaultManagerName;

    const mailList = [destinationEmail];
    const nameList = [destinationName];

    const destinationEmailSub = AlternateManager ? AlternateManager.email : undefined;
    const destinationNameSub = AlternateManager ? AlternateManager.full_name : undefined;

    if (destinationEmailSub) {
      mailList.push(destinationEmailSub);
      nameList.push(destinationNameSub);
    }

    const emailProperties = value.is_anonymous
      ? EMAILS.anonymousQuestionAssigned
      : EMAILS.publicQuestionAssigned;

    await sendEmail({
      to: mailList.join(','),
      subject: emailProperties.subject,
      template: emailProperties.template,
      context: {
        name: nameList.join(' | '),
        question_url: getQuestionDetailUrl(created.question_id),
        question_text: created.question,
      },
    });
  }

  return {
    successMessage: 'The question has been created succesfully!',
    question: created,
  };
};

export default createQuestion;
