import React from 'react';
import PropTypes from 'prop-types';

import { CLOSE_BUTTON } from '~/utils/constants';
import * as Styled from '~/styles/Button.styled';

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
    <React.Fragment>
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
    </React.Fragment>
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
  form: '',
  disabled: false,
  children: '',
};

export default Button;