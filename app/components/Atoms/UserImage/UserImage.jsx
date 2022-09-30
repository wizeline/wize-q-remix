import PropTypes from 'prop-types';
import * as S from './UserImage.Styled';
import PlaceHolderImage from '~/images/placeholder_user_img.png';

const UserImage = ({ src, alt, customSize, size }) => {
  return (
    <S.Container size={size} customSize={customSize}>
      <S.Image src={src || PlaceHolderImage} alt={alt} />
    </S.Container>
  );
}

UserImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'big', 'extra big']),
  customSize: PropTypes.string,
};

UserImage.defaultProps = {
  alt: '',
  size: 'medium',
  customSize: null,
};

export default UserImage;