import { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '~/images/logo.png';
import * as Styled from '~/components/AppNavbar/AppNavbar.Styled';
import UserControls from '~/components/UserControls';
import { useUser } from '~/utils/hooks/useUser';

const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
  };

  const complexOnSelect = (eventKey) => {
    if (eventKey === 2) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const profile = useUser();

  return (
    <Styled.AppNav
      onSelect={complexOnSelect}
      expanded={expanded}
      onToggle={toggle}
    >
        <Navbar.Brand>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" className="App-logo" />
            </Link>
          </Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Collapse >
          { profile &&
            <UserControls
              name={profile.full_name}
              title={profile.job_title}
              email={profile.email}
              picture={profile.profile_picture}
              isAdmin={profile.is_admin}
            />
          }
        </Navbar.Collapse>
    </Styled.AppNav>

  );
}

export default AppNavbar;
