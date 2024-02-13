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
          </styled.ModalHeader>
          <styled.ModalBody>
            <p>
              Welcome to Wize Q.
              This is a space for asking questions and providing answers
              that are helpful to our community. Before you get started,
              please remember to practice our values when using the platform
            </p>
            <styled.ValuesInformation>
              <p>
                {renderBulletPoint('var(--color-primary)')}
                <styled.ValueText color="var(--color-primary)">Ownership</styled.ValueText>
                <br />
                - Before posting, check if the answer is already available in other channels.
                Additionally, if you know the answer to a question from another Wizeliner,
                be sure to respond.
              </p>
              <p>
                {renderBulletPoint('var(--color-secondary)')}
                <styled.ValueText color="var(--color-secondary)">Innovation</styled.ValueText>
                <br />
                - If someone shares a concern or challenge, try to propose a solution!
              </p>
              <p>
                {renderBulletPoint('#E5C8A6')}
                <styled.ValueText color="#E5C8A6">Community</styled.ValueText>
                <br />
                - Treat everyone with dignity and respect,
                be honest and constructive, and always assume others have good intentions.
              </p>
            </styled.ValuesInformation>
            <p>
              For more detailed guidelines, please see  Wize Q’s home page.
            </p>
            <p>Thanks for being a valuable contributor to our community! </p>
            <strong><p>The Wize Q Team</p></strong>
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
