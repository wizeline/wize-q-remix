import React from 'react';
import * as Styled from './Slogan.Styled';

function Slogan() {
  return (
    <Styled.SloganContainer>
      <p>
        Your
        {' '}
        <span>safespace</span>
        {' '}
        to search answers,
        ask questions, and learn about
        <span>Wizeline</span>
      </p>
    </Styled.SloganContainer>
  );
}

export default Slogan;
