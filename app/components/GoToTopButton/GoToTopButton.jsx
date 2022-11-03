import { useState, useEffect } from 'react';
import * as Styled from './GoToTopButton.Styled';
import { BACK_TO_TOP } from '~/utils/constants';
import ArrowIcon from '~/components/Atoms/ArrowIcon';

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
      display={show}
      onClick={goToTop}
    >
      <ArrowIcon />
      <Styled.Span>{BACK_TO_TOP}</Styled.Span>
    </Styled.Button>
  );
}

export default GoToTopButton;
