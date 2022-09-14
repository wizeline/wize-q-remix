import { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '~/images/logo.png';
// import UserControls from '../../Organisms/UserControl/UserControls';
import * as Styled from '~/styles/Navbar.Styled';
import UserControls from '~/components/UserControls';

const AppNavbar = (props) => {
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

//   const { profile } = props;
  const profile = {}

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
            name={profile.name}
            title={profile.title}
            email={profile.email}
            picture={profile.picture}
          />
        }
      </Navbar.Collapse>
    </Styled.AppNav>

  );
}

export default AppNavbar;
