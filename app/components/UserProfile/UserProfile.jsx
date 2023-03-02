import React from 'react';
import PropTypes from 'prop-types';
import UserImage from 'app/components/Atoms/UserImage';
import * as Styled from 'app/components/UserProfile/UserProfile.styled';
import { Link } from 'react-router-dom';

function UserProfile({
  name, title, email, picture,
}) {
  return (
    <Styled.ProfileDropdown>
      <Styled.ProfileDropdownInfo>
        <Link to="/profile">
          <UserImage src={picture} size="big" alt="user" />
        </Link>
        <Styled.ProfileDropdownUser>
          <Styled.ProfileDropdownName>{name}</Styled.ProfileDropdownName>
          <p>{title}</p>
          <p>{email}</p>
        </Styled.ProfileDropdownUser>
      </Styled.ProfileDropdownInfo>
    </Styled.ProfileDropdown>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

UserProfile.defaultProps = {
  title: '',
};

export default UserProfile;
