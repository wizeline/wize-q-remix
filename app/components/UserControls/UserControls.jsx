import { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar } from 'react-bootstrap';
import * as Styled from '~/components/UserControls/UserControl.styled';
import { useLocation } from '@remix-run/react';
import UserDropdown from '~/components/UserDropdown';
import LogoutConfirmationModal from '~/components/Modals/LogoutConfirmationModal';

function UserControls(props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogoutClick = () => {
    setShowLogoutModal(false);
  };

  const { name, title, email, picture, isAdmin } = props;
  const location = useLocation();

  return (
    <Styled.Nav
      className="justify-content-end flex-grow-1 pe-3"
      activeKey={location.pathname}
    >
      <Styled.NavLink href="/">
        Home
      </Styled.NavLink>
      <Styled.NavLink href="/about">
        About
      </Styled.NavLink>
      <Styled.NavLink href="/contact">
        Contact
      </Styled.NavLink>
      {isAdmin && (
        <Styled.NavLink href="/admin">
         Admin
        </Styled.NavLink>
      )}
      <Styled.NavLi >
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
{/* 
      <Styled.XSNavItem
        eventKey={2}
        onClick={handleLogoutClick}
      >
        Logout
      </Styled.XSNavItem>
       */}

      <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={handleCancelLogoutClick}
      />
    </Styled.Nav>
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