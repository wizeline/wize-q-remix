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
import { sendEmailToManagerOnQuestionCreation, sendSlackOnQuestionCreation, privateAnonQuestions } from 'app/config/flags.json';
import { defaultManagerEmail, defaultManagerName } from 'app/config/emails.json';

const createQuestion = async (
  body,
  config = {
    sendEmailToManagerOnQuestionCreation,
    sendSlackOnQuestionCreation,
    privateAnonQuestions,
  },
) => {
  const { error, value } = createQuestionSchema.validate(body);
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
  let isPublic;

  if (privateAnonQuestions) {
    isPublic = !value.is_anonymous;
  } else {
    isPublic = true;
  }

  let created = await db.questions.create({
    data: {
      ...rest,
      question: sanitizeHTML(value.question),
      is_public: isPublic,
    },
  });

  if (value.is_anonymous) {
    const sessionhash = generateSessionIdHash(accessToken, created.question_id);

    created = await db.questions.update({
      where: {
        question_id: created.question_id,
      },
      data: {
        user_hash: sessionhash,
      },
    });
  }

  if (config.sendSlackOnQuestionCreation) {
    slack.createQuestionNotification({
      questionBody: stripNewLines(truncate(value.question), SLACK_QUESTION_LIMIT),
      questionId: created.question_id,
      is_public: created.is_public,
    });
  }

  if (config.sendEmailToManagerOnQuestionCreation) {
    let departmentManager;

    if (created.assigned_department) {
      departmentManager = (await db.departments.findUnique(({
        where: {
          department_id: created.assigned_department,
        },
        include: { managerdepartmet: true, alternatemanager: true },
      })));
    }
    const { managerdepartmet, alternatemanager } = departmentManager;

    const destinationEmail = managerdepartmet ? managerdepartmet.email : defaultManagerEmail;
    const destinationName = managerdepartmet ? managerdepartmet.full_name : defaultManagerName;

    const mailList = [destinationEmail];
    const nameList = [destinationName];

    const destinationEmailSub = alternatemanager ? alternatemanager.email : undefined;
    const destinationNameSub = alternatemanager ? alternatemanager.full_name : undefined;

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
