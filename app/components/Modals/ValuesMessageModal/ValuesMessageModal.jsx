import React from 'react';
import PropTypes from 'prop-types';
import useUser from 'app/utils/hooks/useUser';
import * as styled from 'app/components/Modals/ValuesMessageModal/ValuesMessageModal.Styled';
import Button from 'app/components/Atoms/Button';
import { BsCircleFill } from 'react-icons/bs';
import { SECONDARY_BUTTON } from 'app/utils/constants';

function ValuesMessageModal({ show, onClose }) {
  const profile = useUser();

  const renderBulletPoint = (color) => (
    <BsCircleFill color={color} size="7px" style={{ marginTop: '3px', marginRight: '10px' }} />
  );

  if (!show) { return null; }
  return (
    <div onClick={onClose}>
      <styled.Modal onClick={onClose}>
        <styled.ModalDialog show hide={onClose}>
          <styled.ModalHeader>
            <styled.ModalTitle>
              Hello
              {' '}
              {profile.full_name}
              {' '}
              !
            </styled.ModalTitle>
            <styled.ModalSubtitle>
              Welcome to Wize Q!
            </styled.ModalSubtitle>
          </styled.ModalHeader>
          <styled.ModalBody>
            <p>
              We want to share a few simple guidelines before you start.
              Remember that Wize Q is a space for asking questions and providing answers that
              are helpful to our community.
            </p>
            <p>Please practice our values when using Wize Q: </p>
            <styled.ValuesInformation>
              <p>
                {renderBulletPoint('var(--color-primary)')}
                <styled.ValueText color="var(--color-primary)">Ownership</styled.ValueText>
                – See if you can find the answer to your question before posting on Wize Q.
                And if you know the answer to a question or how to find it,
                be sure to reply — anyone can!
              </p>
              <p>
                {renderBulletPoint('var(--color-secondary)')}
                <styled.ValueText color="var(--color-secondary)">Innovation</styled.ValueText>
                – When someone shares a concern or challenge,
                let’s be innovative — propose a solution or offer support!
              </p>
              <p>
                {renderBulletPoint('#E5C8A6')}
                <styled.ValueText color="#E5C8A6">Community</styled.ValueText>
                – Remember to treat everyone with dignity and respect.
                Assume others have good intentions. Always be honest and constructive.
                Let’s make Wizeline a community where everyone can thrive.
              </p>
            </styled.ValuesInformation>
            <p>
              Consider that other channels:
              (ticketing portal, Slack, your TPLs or people partner)
              might be more effective for finding the right answer quickly.
            </p>
            <p>Thanks for being a valuable contributor to our community! </p>
            <p>The Wize Q Team</p>
          </styled.ModalBody>
          <styled.ModalFooter>
            <Button
              id="btnAccept"
              category={SECONDARY_BUTTON}
              onClick={onClose}
            >
              Accept
            </Button>
          </styled.ModalFooter>
        </styled.ModalDialog>
      </styled.Modal>
    </div>
  );
}

ValuesMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ValuesMessageModal;
