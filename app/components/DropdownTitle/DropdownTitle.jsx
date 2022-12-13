import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import * as S from './DropdownTitle.Styled';

function DropdownTitle({ children, title, type }) {
  return (
    <S.QuestionAssignerToolTipContainer title={title}>
      {children}
      <div style={{ display: 'flex', marginLeft: '10px', marginRight: '5px' }}>
        {title || type}
      </div>
      <MdOutlineKeyboardArrowDown color={title ? 'white' : 'black'} />
    </S.QuestionAssignerToolTipContainer>
  );
}

DropdownTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default DropdownTitle;
