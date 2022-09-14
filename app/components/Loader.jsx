import PropTypes from 'prop-types';

import * as Styled from '~/styles/Loader.Styled';

function Loader({ src, size }) {
  return (
    <Styled.LoaderWrapper>
      <Styled.Spinner src={src} alt="Wizeline logo" size={size} />
      <Styled.LoaderText size={size}>Loading...</Styled.LoaderText>
    </Styled.LoaderWrapper>
  );
}

Loader.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

Loader.defaultProps = {
  src: '',
  size: '',
};

export default Loader;