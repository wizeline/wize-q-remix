import React from 'react';
import { Form } from '@remix-run/react';
import PropTypes from 'prop-types';
import Button from 'app/components/Atoms/Button';
import { CLOSE_BUTTON, DANGER_BUTTON, SECONDARY_BUTTON } from 'app/utils/constants';
import useUser from 'app/utils/hooks/useUser';
import * as Styled from 'app/components/Modals/LogoutConfirmationModal/LogoutConfirmationModal.styled';

function LogoutConfirmationModal({ show, onClose }) {
  const profile = useUser();

  if (!show) { return null; }
  return (
    <div onClick={onClose}>
      <Styled.LogoutModal show>
        <Form action="/logout" method="POST">
          <Styled.LogoutModalDialog onClick={(e) => e.stopPropagation()}>
            <Styled.ModalHeader variant="logout" closeButton>
              <Styled.ModalTitle>Warning</Styled.ModalTitle>
              <Button category={CLOSE_BUTTON} onClick={onClose} />
            </Styled.ModalHeader>
            <Styled.ModalBody>
              <p>
                {' '}
                You&apos;re about to log out as
                {profile.full_name}
                ,
                do you still want to continue?
                {' '}
              </p>
            </Styled.ModalBody>
            <Styled.ModalFooter variant="logout">
              <Button type="button" category={SECONDARY_BUTTON} onClick={onClose}>Cancel</Button>
              <Button category={DANGER_BUTTON} type="submit">Logout</Button>
            </Styled.ModalFooter>
          </Styled.LogoutModalDialog>
        </Form>
      </Styled.LogoutModal>
    </div>
  );
}

LogoutConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LogoutConfirmationModal;
