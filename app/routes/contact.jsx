/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { json } from '@remix-run/node';
import {
  CONTACT_REASONS_LIST,
  CONTACT_REASONS_MAP,
  CONTACT_WARNING,
  MAXIMUM_MESSAGE_LENGTH,
  MAXIUMUM_EMAIL_LENGTH,
  MAXIMUM_NAME_LENGTH,
  MAXIMUM_REASON_LENGTH,
} from 'app/utils/constants';
import Footer from 'app/components/Footer';
import mailIcon from 'app/images/ic_email.svg';
import slackIcon from 'app/images/ic_slack.svg';
import ContactGoto from 'app/components/ContactGoto';
import * as Styled from 'app/styles/Contact.Styled';
import { requireAuth } from 'app/session.server';
import useUser from 'app/utils/hooks/useUser';

export const loader = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

const initialState = {
  reason: '',
  message: '',
  placeholders: {
    message: 'Your message',
  },
  isSubmitted: false,
};

const Contact = (props) => {
  
  const { full_name: name, email } = useUser();

  const [state, setState] = useState(initialState);

  const resetForm = () => {
    setState(initialState);
  };

  const handleContactClick = () => {
    resetForm();
  };

  const renderSuccessMessage = () => (
    <Styled.SuccessDiv>
      <p>
        Thanks for contacting us! We will review your feedback shortly.
      </p>
      <p>
        Click
        {' '}
        <button type="button" onClick={handleContactClick}> here </button>
        {' '}
        to contact us again.
      </p>
      <p>
        Cheers,
        <br />
        {' '}
        The WizeQ team!
      </p>
    </Styled.SuccessDiv>
  );

  const renderOptionsList = () => CONTACT_REASONS_LIST.map(
    (options) => <option value={options.value} key={options.value}>{options.reason}</option>,
  );

  const onInputChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    })
  };

  const handleEmailSent = () => {
    setState((prevState) => ({
      ...prevState,
      isSubmitted: true,
    }));
  };

  const createEmailContent = () => {
    const emailObj = {};
    emailObj.fullName = name;
    emailObj.email = email;
    emailObj.reason = CONTACT_REASONS_MAP[state.reason];
    emailObj.message = state.message;
    return emailObj;
  };

  const onSubmitWithSuccess = () => {
    const emailBody = createEmailContent();
    props.sendContact(emailBody);
    
    handleEmailSent();
  };

  const inputLengthIsValid = (input, maxLength) => (
    input.length > 0 && input.length <= maxLength
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (state.isSubmitted) {
      return;
    }

    if (!inputLengthIsValid(name, MAXIMUM_NAME_LENGTH)) {
      props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!inputLengthIsValid(email, MAXIUMUM_EMAIL_LENGTH)) {
      props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!inputLengthIsValid(state.reason, MAXIMUM_REASON_LENGTH)) {
      props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!inputLengthIsValid(state.message, MAXIMUM_MESSAGE_LENGTH)) {
      props.warningAlert(CONTACT_WARNING);
      return;
    }

    onSubmitWithSuccess();
  };

  const renderContactForm = () => {
    const firstName = name ? name.split(' ')[0] : '';
    return (
      <Styled.ContactForm onSubmit={onSubmit}>
        <Styled.ContactFormP>
          Hi
          <strong> {firstName}</strong>
          !
          <br />
          Send us a message!
        </Styled.ContactFormP>
        <Styled.ContactSelect name="reason" onChange={onInputChange}>
          {renderOptionsList()}
        </Styled.ContactSelect>
        <Styled.ContactTextArea name="message" placeholder={state.placeholders.message} onChange={onInputChange} />
        <Styled.BtnContainer>
          <Styled.SubmitBtn type="submit">Submit</Styled.SubmitBtn>
        </Styled.BtnContainer>
      </Styled.ContactForm>
    );
  };

  const handleRender = () => {
    if (!state.isSubmitted) {
      return renderContactForm();
    }
    if (state.isSubmitted) {
      return renderSuccessMessage();
    }
    return null;
  };

  return (
    <Styled.ContactCardDiv>
      <Styled.ContactInputHeader>
        <Styled.ContactInputHeaderH1>Contact Us</Styled.ContactInputHeaderH1>
        <Styled.ContactInputHeaderH2>We are here for you!</Styled.ContactInputHeaderH2>
        <Styled.ContactInputHeaderP>
          We’d love to hear from you, please let us
          know what you think and get in touch with us.
          {' '}
        </Styled.ContactInputHeaderP>

        <Styled.ContactInputSitesDiv>
          <ContactGoto
            icon={mailIcon}
            text="Email us at"
            goto="wizeq@wizeline.com"
            dir="mailto:wizeq@wizeline.com"
          />
          <ContactGoto
            icon={slackIcon}
            text="Slack us at"
            goto="#wize-q-support"
            dir="https://wizeline.slack.com/messages/C6M652THT"
          />
        </Styled.ContactInputSitesDiv>
      </Styled.ContactInputHeader>
      <Styled.ContactInputDiv>
        {handleRender()}
      </Styled.ContactInputDiv>
      <Footer />
    </Styled.ContactCardDiv>
  );
};

Contact.propTypes = {
  sendContact: PropTypes.func.isRequired,
  warningAlert: PropTypes.func.isRequired,
};

export default Contact;
