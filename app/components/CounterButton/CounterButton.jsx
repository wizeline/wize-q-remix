import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './CounterButton.Styled';

function CounterButton({
  id, icon, count, selected, onClick, notButton, processingFormSubmission, isDisabled,
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
      </span>
    </Styled.ContainerCounterButton>
  );
}

CounterButton.defaultProps = {
  id: '',
  count: 0,
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
  count: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  notButton: PropTypes.bool,
  processingFormSubmission: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default CounterButton;
