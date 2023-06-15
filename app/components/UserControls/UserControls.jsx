import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import * as Styled from 'app/components/UserControls/UserControl.styled';
import UserDropdown from 'app/components/UserDropdown';
import LogoutConfirmationModal from 'app/components/Modals/LogoutConfirmationModal';
import SearchBarNav from 'app/components/SearchBarNav';

function UserControls(props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogoutClick = () => {
    setShowLogoutModal(false);
  };

  const {
    name, title, email, picture, isAdmin,
  } = props;

  return (
    <Styled.NavBar pullRight>
      <Styled.SearchBarNavContainer>
        <SearchBarNav />
      </Styled.SearchBarNavContainer>
      <LinkContainer to="/" exact="true">
        <Styled.Navitem>Home</Styled.Navitem>
      </LinkContainer>
      <LinkContainer to="/about">
        <Styled.Navitem eventKey={1}>About</Styled.Navitem>
      </LinkContainer>
      <LinkContainer to="/contact">
        <Styled.Navitem>Contact</Styled.Navitem>
      </LinkContainer>
      {isAdmin && (
        <LinkContainer to="/admin">
          <Styled.Navitem>Admin</Styled.Navitem>
        </LinkContainer>
      )}
      <Styled.NavLi>
        <ButtonToolbar>
          <UserDropdown
            name={name}
            title={title}
            email={email}
            picture={picture}
            onLogoutClick={handleLogoutClick}
          />
        </ButtonToolbar>
      </Styled.NavLi>
      <Styled.XSNavItem
        eventKey={2}
        onClick={handleLogoutClick}
      >
        Logout
      </Styled.XSNavItem>
      <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={handleCancelLogoutClick}
      />
    </Styled.NavBar>
  );
}

UserControls.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};

UserControls.defaultProps = {
  title: '',
  name: '',
  isAdmin: false,
};

export default UserControls;
