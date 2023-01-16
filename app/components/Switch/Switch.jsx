import React from 'react';
import PropTypes from 'prop-types';
import * as S from './Switch.Styled';

function Switch({ id, checked, onChange }) {
  return (
    <S.Switch htmlFor={id || 'react-switch-new'}>
      <input type="checkbox" checked={checked} onChange={onChange} id={id || 'react-switch-new'} />
      <S.Slider />
    </S.Switch>
  );
}

export default Switch;

Switch.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  id: 'react-switch-new',
};
