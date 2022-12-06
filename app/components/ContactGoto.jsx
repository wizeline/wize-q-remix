import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '~/styles/Contact.Styled';

function ContactGoto(props) {
  const {
    icon, text, goto, dir,
  } = props;
  return (
    <Styled.ContactInputGoTo>
      <Styled.ContactInputGoToImg src={icon} />
      <Styled.ContactInputGoToP>{text}</Styled.ContactInputGoToP>
      <Styled.ContactInputGoToA href={dir} target="_blank" rel="noopener noreferrer">{goto}</Styled.ContactInputGoToA>
    </Styled.ContactInputGoTo>
  );
}

ContactGoto.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  goto: PropTypes.string.isRequired,
  dir: PropTypes.string.isRequired,
};

export default ContactGoto;
