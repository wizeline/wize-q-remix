import React from 'react';
import PropTypes from 'prop-types';
import UserImage from '../Atoms/UserImage';
import { ANONYMOUS_USER } from '../../utils/constants';

function InputAuthor(props) {
  return (
    props.isAnonymous ? (
      <UserImage size="big" src={props.anonymousProfilePicture} />
    ) : (
      <UserImage
        src={props.profilePicture}
        size="big"
      />
    )
  );
}

InputAuthor.propTypes = {
  anonymousProfilePicture: PropTypes.string,
  profilePicture: PropTypes.string,
  isAnonymous: PropTypes.bool.isRequired,
};

InputAuthor.defaultProps = {
  anonymousProfilePicture: ANONYMOUS_USER.profilePicture,
  profilePicture: '',
};

export default InputAuthor;
