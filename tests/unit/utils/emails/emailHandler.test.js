import { EMAIL_SUBJECT_PREFIX } from 'app/utils/emails/emailConstants';
import { sendEmail } from 'app/utils/emails/emailHandler';
import { instantiateTransporter } from 'app/utils/emails/emailTransporter';

jest.mock('app/utils/emails/emailTransporter');

const transporterSendCall = jest.fn();

describe('emailHandler', () => {
  const message = {
    subject: `${EMAIL_SUBJECT_PREFIX}A email subject`,
    to: 'test@mail.com',
    template: 'test',
  };

  beforeEach(() => {
    instantiateTransporter.mockClear();
    transporterSendCall.mockClear();
  });

  it('does not send email and returns undefined if transported not created', () => {
    instantiateTransporter.mockReturnValue(undefined);
    sendEmail(message);
    expect(instantiateTransporter).toHaveBeenCalled();
    expect(transporterSendCall).toHaveBeenCalledTimes(0);
  });

  it('calls transporter with args', () => {
    instantiateTransporter.mockReturnValue({
      sendMail: transporterSendCall,
    });

    sendEmail(message);
    expect(instantiateTransporter).toHaveBeenCalled();
    expect(transporterSendCall).toHaveBeenCalledTimes(1);
    expect(transporterSendCall).toHaveBeenCalledWith(message);
  });

  it('adds email subject prefix if not present', () => {
    instantiateTransporter.mockReturnValue({
      sendMail: transporterSendCall,
    });

    const noPrefixMessage = {
      ...message,
      subject: 'a email',
    };

    sendEmail(noPrefixMessage);
    expect(instantiateTransporter).toHaveBeenCalled();
    expect(transporterSendCall).toHaveBeenCalledTimes(1);
    expect(transporterSendCall).toHaveBeenCalledWith({
      ...noPrefixMessage,
      subject: `${EMAIL_SUBJECT_PREFIX}${noPrefixMessage.subject}`,
    });
  });

  it('throws error when required parameters not present', async () => {
    instantiateTransporter.mockReturnValue({
      sendMail: transporterSendCall,
    });

    await expect(async () => sendEmail({})).rejects.toThrowError();
    expect(instantiateTransporter).toHaveBeenCalledTimes(0);
    expect(transporterSendCall).toHaveBeenCalledTimes(0);
  });
});
