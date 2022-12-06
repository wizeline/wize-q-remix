/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './SubmitWithModal.Styled';
import {
  IDENTITY_MESSAGE,
  SECONDARY_BUTTON,
  DANGER_BUTTON,
  CLOSE_BUTTON,
} from '../../utils/constants';
import useUser from '../../utils/hooks/useUser';
import Button from '../Atoms/Button';
import UserImage from '../Atoms/UserImage';

function SubmitWithModal(props) {
  const { isAnonymous, warnings } = props;
  const { picture, full_name } = useUser();

  const renderProfilePicture = () => {
    if (props.isAnonymous) { return null; }
    return (
      <UserImage src={picture} size="big" />
    );
  };

  const renderIdentityWarning = () => {
    let identityMessage = IDENTITY_MESSAGE;
    let usernameTag = '';

    if (!isAnonymous) {
      identityMessage += ' as:';
      usernameTag = <Styled.UserName>{full_name}</Styled.UserName>;
    }

    return (
      <Styled.IdentityWarning>
        <Styled.IdentityMessage>{identityMessage}</Styled.IdentityMessage>
        <br />
        <Styled.UserInfoContainer>
          {renderProfilePicture()}
          {usernameTag}
        </Styled.UserInfoContainer>
      </Styled.IdentityWarning>
    );
  };

  const renderWarnings = () => {
    let messages;
    if (!warnings.length) {
      return null;
    } if (warnings.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      messages = warnings[0];
    } else {
      messages = warnings.map((warning) => (
        <p key={warning}>
          -
          {warning}
        </p>
      ));
    }
    return (
      <Styled.WarningContainer>
        <Styled.WarningIcon />
        <Styled.Warnings>
          {messages}
        </Styled.Warnings>
      </Styled.WarningContainer>
    );
  };

  if (!props.show) { return null; }
  return (
    <div onClick={props.onClose}>
      <Styled.Modal show>
        <Styled.ModalDialog variant="submit" onClick={(e) => e.stopPropagation()}>
          <Styled.ModalHeader>
            <Button category={CLOSE_BUTTON} onClick={props.onClose} />
          </Styled.ModalHeader>
          <Styled.ModalBody>
            {renderIdentityWarning()}
            {renderWarnings()}
          </Styled.ModalBody>
          <Styled.ModalFooter>
            <Button type="button" category={SECONDARY_BUTTON} onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="button" category={DANGER_BUTTON} onClick={props.onSubmitSuccess}>
              Submit
            </Button>
          </Styled.ModalFooter>
        </Styled.ModalDialog>
      </Styled.Modal>
    </div>
  );
}

SubmitWithModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAnonymous: PropTypes.bool.isRequired,
};
export default SubmitWithModal;
