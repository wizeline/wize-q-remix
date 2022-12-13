/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from '@remix-run/react';
import logo from 'app/images/logo-white.png';
import * as Styled from 'app/components/AppNavbar/AppNavbar.Styled';
import UserControls from 'app/components/UserControls';
import useUser from 'app/utils/hooks/useUser';
import SearchBarNav from 'app/components/SearchBarNav';

function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

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

  if (!profile) {
    return;
  }

  return (
    <Styled.AppNav
      onSelect={complexOnSelect}
      expanded={expanded}
      onToggle={toggle}
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" className="App-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Styled.ButtonBootstrap
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <Styled.IconWrapper>
            <Styled.SearchIcon />
          </Styled.IconWrapper>
        </Styled.ButtonBootstrap>
      </Navbar.Header>
      <Navbar.Collapse id="user-controls">
        <UserControls
          name={profile.full_name}
          title={profile.job_title}
          email={profile.email}
          picture={profile.profile_picture}
          isAdmin={profile.is_admin}
        />
      </Navbar.Collapse>
      <Styled.SearchBarNavContainer>
        <Navbar.Collapse in={open} id="example-collapse-text" style={{ width: '100%', padding: '10px', overflow: 'visible' }}>
          <SearchBarNav />
        </Navbar.Collapse>
      </Styled.SearchBarNavContainer>
    </Styled.AppNav>

  );
}

export default AppNavbar;
