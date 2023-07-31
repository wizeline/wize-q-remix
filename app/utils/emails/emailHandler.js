/* eslint-disable no-console */
const { EMAIL_SUBJECT_PREFIX } = require('app/utils/emails/emailConstants');
const { instantiateTransporter } = require('app/utils/emails/emailTransporter');
const { sendEmailSchema } = require('app/utils/validators/email');

const sendEmail = async (message) => {
  const { error } = sendEmailSchema.validate(message);
  if (error) {
console.log('error - ', error);
    throw Error(error);
  }
  const transporter = instantiateTransporter();
  if (!transporter) return;

  let transformedSubject = message.subject;

  if (!message.subject.includes(EMAIL_SUBJECT_PREFIX)) {
    transformedSubject = `${EMAIL_SUBJECT_PREFIX}${message.subject}`;
  }

  try {
    await transporter.sendMail({
      ...message,
      subject: transformedSubject,
    });
  } catch (sendEmailError) {
    // TODO: Improve error logging
    console.error('Email handler error: ', sendEmailError);
  }
};

module.exports = {
  sendEmail,
};
