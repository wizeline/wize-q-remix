import PropTypes from 'prop-types';
import UserImage from '~/components/Atoms/UserImage';
import UserProfile from '~/components/UserProfile';
import * as Styled from './UserDropdown.styled';

export default function UserDropdown({ name, title, email, picture, onLogoutClick }) {

  const userImageToggle = (
    <UserImage src={picture} size="big" alt="user" />
  );

  return (
    <Styled.NavDropdown title={userImageToggle} id="nav-dropdown">
        <Styled.UserInfo>
          <UserProfile
            name={name}
            title={title}
            email={email}
            picture={picture}
          />
        </Styled.UserInfo>
        <Styled.NavDropdownItem
          footer="true"
          eventKey="1"
          onClick={onLogoutClick}
        >
          Logout
        </Styled.NavDropdownItem>
    </Styled.NavDropdown >
  );
}

UserDropdown.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

UserDropdown.defaultProps = {
  title: '',
};

