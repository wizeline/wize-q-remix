import React from 'react';
import PropTypes from 'prop-types';

import { CLOSE_BUTTON } from 'app/utils/constants';
import * as Styled from 'app/components/Atoms/Button/Button.Styled';

function Button({
  id,
  type,
  className,
  title,
  onClick,
  category,
  value,
  form,
  disabled,
  children,
}) {
  const RootButton = category === CLOSE_BUTTON ? Styled.CloseButton : Styled.MainButton;

  return (
    <RootButton
      id={id}
      type={type}
      className={className}
      title={title}
      onClick={onClick}
      category={category}
      value={value}
      form={form}
      disabled={disabled}
    >
      {children}
    </RootButton>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  category: PropTypes.string.isRequired,
  value: PropTypes.string,
  form: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string,
};

Button.defaultProps = {
  id: '',
  type: 'button',
  className: '',
  title: '',
  onClick: null,
  value: '',
  form: null,
  disabled: false,
  children: '',
};

export default Button;
