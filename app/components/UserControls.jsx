import { useState } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
// import { logout, isAdmin } from '../../../auth';
// import LogoutConfirmationModal from '../../Molecules/LogoutConfirmationModal';
// import UserDropdown from '~/componentsUserDropdown';
import * as Styled from '~/styles/UserControl.styled';

function UserControls(props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogoutClick = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogoutClick = () => console.log('logout');
  const isAdmin = () => true;

  const { name, title, email, picture } = props;

  return (
    <Styled.NavBar pullRight className="justify-content-end flex-grow-1 pe-3">
      <LinkContainer to="/" exact>
        <Styled.Navitem>Home</Styled.Navitem>
      </LinkContainer>
      <LinkContainer to="/about">
        <Styled.Navitem eventKey={1}>About</Styled.Navitem>
      </LinkContainer>
      <LinkContainer to="/contact">
        <Styled.Navitem>Contact</Styled.Navitem>
      </LinkContainer>
      {isAdmin() && (
        <LinkContainer to="/admin">
          <Styled.Navitem>Admin</Styled.Navitem>
        </LinkContainer>
      )}
      <Styled.NavLi >
        <ButtonToolbar>
          {/* <UserDropdown
            name={name}
            title={title}
            email={email}
            picture={picture}
            onLogoutClick={handleLogoutClick}
          /> */}
        </ButtonToolbar>
      </Styled.NavLi>
      <Styled.XSNavItem
        eventKey={2}
        onClick={handleLogoutClick}
      >
        Logout
      </Styled.XSNavItem>
      {/* <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={handleCancelLogoutClick}
        onSubmitSuccess={handleConfirmLogoutClick}
      /> */}
    </Styled.NavBar>
  );
}

UserControls.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

UserControls.defaultProps = {
  title: '',
  name: '',
};

export default UserControls;