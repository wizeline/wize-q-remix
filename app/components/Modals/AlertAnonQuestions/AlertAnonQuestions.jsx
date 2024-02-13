/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import * as s from 'app/components/Modals/AlertAnonQuestions/AlertAnonQuestions.styled';
import Button from 'app/components/Atoms/Button';
import {
  CLOSE_BUTTON,
  SECONDARY_BUTTON,
  PRIMARY_BUTTON,
  COPIED_LINK_MESSAGE,
} from 'app/utils/constants';
import { useRef, useState } from 'react';

function AlertAnonQuestions({
  onClose,
  data,
}) {
  const parrafoRef = useRef();
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const { message, questionUrl } = data;

  const copyLink = () => {
    if (parrafoRef.current) {
      const seleccion = window.getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(parrafoRef.current);
      seleccion.removeAllRanges();
      seleccion.addRange(rango);

      document.execCommand('copy');
      seleccion.removeAllRanges();
      setShowCopyMessage(true);

      setTimeout(() => {
        setShowCopyMessage(false);
      }, 3000);
    }
  };

  return (
    <s.Modal>
      <s.ModalDialog>
        <s.ModalHeader>
          <Button category={CLOSE_BUTTON} onClick={onClose} />
        </s.ModalHeader>
        <s.ModalBody>
          <s.WarningContainer>
            <s.WarningIcon />
            <s.Warnings>
              <h4>
                {' '}
                {message}
                {' '}
              </h4>
            </s.Warnings>
          </s.WarningContainer>
          <s.LinkContainer>
            <p ref={parrafoRef}>
              <a href={questionUrl}>
                {questionUrl}
              </a>
            </p>
          </s.LinkContainer>
        </s.ModalBody>
        <s.ModalFooter>
          { showCopyMessage && (
          <p style={{ color: 'green' }}>
            {' '}
            {COPIED_LINK_MESSAGE}
            {' '}
          </p>
          )}
          <Button type="button" category={SECONDARY_BUTTON} onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" category={PRIMARY_BUTTON} onClick={() => copyLink()}>
            Copy Link
          </Button>
        </s.ModalFooter>
      </s.ModalDialog>
    </s.Modal>
  );
}

AlertAnonQuestions.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    message: PropTypes.string,
    questionUrl: PropTypes.string,
  }).isRequired,
};

export default AlertAnonQuestions;
