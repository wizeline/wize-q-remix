/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
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
} from '../utils/constants';
import Footer from '../components/Footer';
import mailIcon from '~/images/ic_email.svg';
import slackIcon from '~/images/ic_slack.svg';
import ContactGoto from '../components/ContactGoto';
import * as Styled from '~/styles/Contact.Styled';
import { requireAuth } from '~/session.server';

export const loader = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      reason: '',
      message: '',
      placeholders: {
        message: 'Your message',
      },
      isSubmitted: false,
    };
  }

  onSubmitWithSuccess = () => {
    const emailBody = this.createEmailContent();
    this.props.sendContact(emailBody);
    this.handleEmailSent();
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.isSubmitted) {
      return;
    }

    if (!this.inputLengthIsValid(this.props.name, MAXIMUM_NAME_LENGTH)) {
      this.props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!this.inputLengthIsValid(this.props.email, MAXIUMUM_EMAIL_LENGTH)) {
      this.props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!this.inputLengthIsValid(this.state.reason, MAXIMUM_REASON_LENGTH)) {
      this.props.warningAlert(CONTACT_WARNING);
      return;
    }

    if (!this.inputLengthIsValid(this.state.message, MAXIMUM_MESSAGE_LENGTH)) {
      this.props.warningAlert(CONTACT_WARNING);
      return;
    }

    this.onSubmitWithSuccess();
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRender = () => {
    if (!this.state.isSubmitted) {
      return this.renderContactForm();
    }
    if (this.state.isSubmitted) {
      return this.renderSuccessMessage();
    }
    return null;
  };

  handleContactClick = () => {
    this.resetForm();
  };

  handleEmailSent = () => {
    this.setState({
      isSubmitted: true,
    });
  };

  inputLengthIsValid = (input, maxLength) => (
    this.input.length > 0 && input.length <= maxLength
  );

  createEmailContent = () => {
    const emailObj = {};
    emailObj.fullName = this.props.name;
    emailObj.email = this.props.email;
    emailObj.reason = CONTACT_REASONS_MAP[this.state.reason];
    emailObj.message = this.state.message;
    return emailObj;
  };

  resetForm = () => {
    this.setState(this.getInitialState());
  };

  renderContactForm = () => {
    const firstName = this.props.name ? this.props.name.split(' ')[0] : '';
    return (
      <Styled.ContactForm onSubmit={this.onSubmit}>
        <Styled.ContactFormP>
          Hi
          <strong>{firstName}</strong>
          !
          <br />
          Send us a message!
        </Styled.ContactFormP>
        <Styled.ContactSelect name="reason" onChange={this.onInputChange}>
          { this.renderOptionsList() }
        </Styled.ContactSelect>
        <Styled.ContactTextArea name="message" placeholder={this.state.placeholders.message} onChange={this.onInputChange} />
        <Styled.BtnContainer>
          <Styled.SubmitBtn type="submit">Submit</Styled.SubmitBtn>
        </Styled.BtnContainer>
      </Styled.ContactForm>
    );
  };

  renderSuccessMessage = () => (
    <Styled.SuccessDiv>
      <p>
        Thanks for contacting us! We will review your feedback shortly.
      </p>
      <p>
        Click
        {' '}
        <button type="button" onClick={this.handleContactClick}> here </button>
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

  renderOptionsList = () => CONTACT_REASONS_LIST.map(
    (options) => <option value={options.value} key={options.value}>{options.reason}</option>,
  );

  render() {
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
          {this.handleRender()}
        </Styled.ContactInputDiv>
        <Footer />
      </Styled.ContactCardDiv>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sendContact: PropTypes.func.isRequired,
  warningAlert: PropTypes.func.isRequired,
};

export default Contact;
