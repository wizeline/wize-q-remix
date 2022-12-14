import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './CounterButton.Styled';

function CounterButton({
  id, icon, text, count, selected, onClick, notButton, processingFormSubmission, isDisabled,
}) {
  const validIcon = React.isValidElement(icon);
  return (
    <Styled.ContainerCounterButton
      id={id}
      onClick={onClick}
      selected={selected}
      notButton={notButton}
      processingFormSubmission={processingFormSubmission}
      disabled={isDisabled}
    >
      {validIcon ? icon : <img src={icon} alt="Icon" />}

      <span>
        {count}
        {
        text
        && (
        <Styled.ContainerCounterButtonNotMobile>
          {text}
        </Styled.ContainerCounterButtonNotMobile>
        )
      }
      </span>
    </Styled.ContainerCounterButton>
  );
}

CounterButton.defaultProps = {
  id: '',
  count: '0',
  selected: false,
  notButton: false,
  onClick: null,
  processingFormSubmission: false,
  isDisabled: false,
};

CounterButton.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  notButton: PropTypes.bool,
  processingFormSubmission: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default CounterButton;
