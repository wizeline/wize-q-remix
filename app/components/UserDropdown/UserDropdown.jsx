import PropTypes from 'prop-types';
import UserImage from '~/components/Atoms/UserImage';
import UserProfile from '~/components/UserProfile';
import * as Styled from './UserDropdown.styled';

export default function UserDropdown({ name, title, email, picture, onLogoutClick }) {
  return (
    <Styled.UDropdown id="userDropdown">
      <Styled.UDropdown.Toggle noCaret componentClass="a">
        <UserImage src={picture} size="big" alt="user" />
      </Styled.UDropdown.Toggle>
      <Styled.UDropdown.Menu>
        <Styled.UInfo>
          <UserProfile
            name={name}
            title={title}
            email={email}
            picture={picture}
          />
        </Styled.UInfo>
        <Styled.UMenuItem
          footer="true"
          eventKey="1"
          onClick={onLogoutClick}
        >
          Logout
        </Styled.UMenuItem>
      </Styled.UDropdown.Menu>
    </Styled.UDropdown>
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

