/* eslint-disable camelcase */
import slackNotify from 'slack-notify';
import {
  DEFAULT_DOMAIN,
  DEFAULT_SLACK_NAME,
  SLACK_ANSWER_COLOR,
  SLACK_ANSWER_EMOJI,
  SLACK_ANSWER_HEADER,
  SLACK_FALLBACK_STRING,
  SLACK_MAX_MESSAGE_SIZE_IN_BYTES,
  SLACK_QUESTION_COLOR,
  SLACK_QUESTION_DETAILS,
  SLACK_QUESTION_EMOJI,
  SLACK_QUESTION_HEADER,
  SLACK_QUESTION_SEE_MORE,
} from './slackConstants';
import { getStringSizeInBytes, truncateStringByBytes } from '../strings/stringUtils';

const slack = slackNotify(process.env.SLACK_WEBHOOK_URL);
const slackAdmins = slackNotify(process.env.SLACK_WEBHOOK_URL_ADMIN);

async function send(options) {
  const { icon_emoji, attachments, is_public } = options;

  const defaults = {
    icon_emoji,
    username: DEFAULT_SLACK_NAME,
    attachments: [
      {
        fallback: SLACK_FALLBACK_STRING,
        mrkdwn_in: ['text'],
        text: attachments.text,
        color: attachments.color,
        pretext: attachments.pretext,
        footer: attachments.footer,
      },
    ],
  };
  if (process.env.SLACK_WEBHOOK_URL && is_public) await slack.send(defaults);
  if (process.env.SLACK_WEBHOOK_URL_ADMIN) await slackAdmins.send(defaults);
}

function buildUrl(questionId) {
  const domain = process.env.SLACK_WIZEQ_DOMAIN || DEFAULT_DOMAIN;
  return `https://${domain}/questions/${questionId}`;
}

async function createAnswerNotification({
  questionId, questionBody, answerBody, is_public,
}) {
  const url = buildUrl(questionId);
  const limit = SLACK_MAX_MESSAGE_SIZE_IN_BYTES;

  let footerBody = SLACK_QUESTION_DETAILS;

  const sizeBeforeTruncate = getStringSizeInBytes(questionBody + answerBody) > limit;

  // if above the size limit, truncate the question
  if (sizeBeforeTruncate) {
    footerBody = SLACK_QUESTION_SEE_MORE;

    // try to truncate the question as much as we can, but to a minimum of 20% of the size limit.
    const maxQuestionSizeInBytes = Math.max(limit * 0.20, limit - getStringSizeInBytes(answerBody));

    // eslint-disable-next-line no-param-reassign
    questionBody = truncateStringByBytes(questionBody, maxQuestionSizeInBytes);

    // if still above size limit, truncate the answer.
    if (getStringSizeInBytes(questionBody + answerBody) > limit) {
      const maxAnswerSizeInBytes = limit - getStringSizeInBytes(questionBody);

      // eslint-disable-next-line no-param-reassign
      answerBody = truncateStringByBytes(questionBody, maxAnswerSizeInBytes);
    }
  }

  const text = `*Q*: _<${url}|${questionBody}>_ \n*A*: ${answerBody}`;
  const footer = `<${url}|${footerBody}>`;

  const options = {
    icon_emoji: SLACK_ANSWER_EMOJI,
    attachments: {
      text,
      footer,
      color: SLACK_ANSWER_COLOR,
      pretext: SLACK_ANSWER_HEADER,
    },
    is_public,
  };

  await send(options);
}

async function createQuestionNotification({ questionBody, questionId, is_public }) {
  const url = buildUrl(questionId);

  let footerBody = SLACK_QUESTION_DETAILS;

  if (getStringSizeInBytes(questionBody) > SLACK_MAX_MESSAGE_SIZE_IN_BYTES) {
    // eslint-disable-next-line no-param-reassign
    questionBody = truncateStringByBytes(
      questionBody,
      SLACK_MAX_MESSAGE_SIZE_IN_BYTES,
    );

    footerBody = SLACK_QUESTION_SEE_MORE;
  }

  const text = `*Q*: _<${url}|${questionBody}>_`;
  const footer = `<${url}|${footerBody}>`;

  const options = {
    icon_emoji: SLACK_QUESTION_EMOJI,
    attachments: {
      text,
      footer,
      color: SLACK_QUESTION_COLOR,
      pretext: SLACK_QUESTION_HEADER,
    },
    is_public,
  };

  await send(options);
}

export default {
  createQuestionNotification,
  createAnswerNotification,
};
