const { EMAIL_SUBJECT_PREFIX } = require('app/utils/backend/emails/emailConstants');
const { instantiateTransporter } = require('app/utils/backend/emails/emailTransporter');
const { sendEmailSchema } = require('app/utils/backend/validators/email');

const sendEmail = async (message) => {
  const { error } = sendEmailSchema.validate(message);
  if (error) {
    throw Error(error);
  }
  const transporter = instantiateTransporter();
  if (!transporter) return;

  let transformedSubject = message.subject;

  if (!message.subject.includes(EMAIL_SUBJECT_PREFIX)) {
    transformedSubject = `${EMAIL_SUBJECT_PREFIX}${message.subject}`;
  }

  await transporter.sendMail({
    ...message,
    subject: transformedSubject,
  });
};

module.exports = {
  sendEmail,
};
