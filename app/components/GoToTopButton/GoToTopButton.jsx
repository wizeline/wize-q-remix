import React, { useState, useEffect } from 'react';
import * as Styled from 'app/components/GoToTopButton/GoToTopButton.Styled';
import { BACK_TO_TOP } from 'app/utils/constants';
import ArrowIcon from 'app/components/Atoms/ArrowIcon';

function GoToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  return (
    <Styled.Button
      id="go-to-top-button"
      display={show ? 'flex' : 'none'}
      onClick={goToTop}
    >
      <ArrowIcon />
      <Styled.Span>{BACK_TO_TOP}</Styled.Span>
    </Styled.Button>
  );
}

export default GoToTopButton;
