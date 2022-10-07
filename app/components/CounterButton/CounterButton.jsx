import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './CounterButton.Styled';

const CounterButton = ({ icon, text, count, selected, onClick, notButton }) => {
  const validIcon = React.isValidElement(icon);
  return (<Styled.ContainerCounterButton
    onClick={onClick}
    selected={selected}
    notButton={notButton}
  >
    {validIcon ? icon : <img src={icon} alt="Icon" />}

    <span>
      {count}
      {
        text &&
        (<Styled.ContainerCounterButtonNotMobile>
          &nbsp;{text}
        </Styled.ContainerCounterButtonNotMobile>)
      }
    </span>
  </Styled.ContainerCounterButton>);
};

CounterButton.defaultProps = {
  count: '0',
  selected: false,
  notButton: false,
  onClick: null,
};

CounterButton.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  notButton: PropTypes.bool,
};

export default CounterButton;
