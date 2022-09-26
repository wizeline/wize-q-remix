import PropTypes from 'prop-types';
import UserImage from '~/components/Atoms/UserImage';
import * as Styled from './UserProfile.styled';

function UserProfile({ name, title, email, picture }) {
  return (
    <Styled.ProfileDropdown>
      <Styled.ProfileDropdownInfo>
        <UserImage src={picture} size="big" alt="user" />
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