import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from 'app/components/Atoms/UserImage/UserImage.Styled';
import PlaceHolderImage from 'app/images/placeholder_user_img.png';

function UserImage({
  src, alt, customSize, size,
}) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <S.Container size={size} customSize={customSize}>
      <S.Image
        alt={alt}
        onError={() => {
          if (imageSrc !== PlaceHolderImage) setImageSrc(PlaceHolderImage);
        }}
        src={imageSrc}
      />
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
