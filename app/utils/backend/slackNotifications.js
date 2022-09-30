import slackNotify from 'slack-notify';
import { DEFAULT_DOMAIN, DEFAULT_SLACK_NAME, SLACK_ANSWER_COLOR, SLACK_ANSWER_EMOJI, SLACK_ANSWER_HEADER, SLACK_ANSWER_UPDATED_HEADER, SLACK_FALLBACK_STRING, SLACK_MAX_MESSAGE_SIZE_IN_BYTES, SLACK_QUESTION_DETAILS, SLACK_QUESTION_SEE_MORE } from '~/utils/backend/slackConstants';
import { getStringSizeInBytes, truncateStringByBytes } from "./stringUtils";

const slack = slackNotify(process.env.SLACK_WEBHOOK_URL);

async function send(options) {
  const { icon_emoji, attachments } = options;

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

  await slack.send(defaults);
}

function buildUrl(questionId) {
  const domain = process.env.SLACK_WIZEQ_DOMAIN || DEFAULT_DOMAIN;
  return `https://${domain}/questions/${questionId}`;
}


async function answer({ questionId, questionBody, answerBody, isUpdated }) {
  if (!process.env.SLACK_WEBHOOK_URL) {
    return;
  }

  const url = buildUrl(questionId);
  const limit = SLACK_MAX_MESSAGE_SIZE_IN_BYTES;

  let footerBody = SLACK_QUESTION_DETAILS

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
      pretext: isUpdated
        ? SLACK_ANSWER_UPDATED_HEADER
        : SLACK_ANSWER_HEADER,
    },
  };

  await send(options);
}

async function question(questionBody, questionId) {
  if (!process.env.SLACK_WEBHOOK_URL) {
    return;
  }

  const url = buildUrl(questionId);

  let footerBody = SLACK_QUESTION_DETAILS;

  if (getStringSizeInBytes(questionBody) > SLACK_MAX_MESSAGE_SIZE_IN_BYTES) {
    // eslint-disable-next-line no-param-reassign
    questionBody = truncateStringByBytes(
      questionBody,
      SLACK_MAX_MESSAGE_SIZE_IN_BYTES);

    footerBody = SLACK_QUESTION_SEE_MORE;
  }

  const text = `*Q*: _<${url}|${questionBody}>_`;
  const footer = `<${url}|${footerBody}>`;

  const options = {
    icon_emoji: SLACK_ANSWER_EMOJI,
    attachments: {
      text,
      footer,
      color: SLACK_ANSWER_COLOR,
      pretext: SLACK_ANSWER_HEADER,
    },
  };

  await send(options);
}

export default {
  question,
  answer,
};
