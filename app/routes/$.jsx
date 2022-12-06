import React from 'react';
import notFoundImage from '~/images/404.svg';
import * as Styled from '~/styles/NotFound.Styled';

function NotFound() {
  return (
    <div>
      <Styled.BackgroundDiv />
      <Styled.MainDiv>
        <Styled.Container>
          <Styled.Img src={notFoundImage} alt="404" />
          <Styled.Title>Sorry! The page you were looking for doesn’t exist.</Styled.Title>
          <Styled.SLink to="/">Go back</Styled.SLink>
        </Styled.Container>
      </Styled.MainDiv>
    </div>
  );
}

export default NotFound;
