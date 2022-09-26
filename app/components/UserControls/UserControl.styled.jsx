import styled from 'styled-components';
import { Nav as BootstrapNav, NavItem } from 'react-bootstrap';

export const Nav = styled(BootstrapNav)`
  margin-right: 15px;
  justify-content: end;
`;

export const NavLink = styled(Nav.Link)`
  line-height: 20px;
  margin-left: 30px;
  padding-top: 0;
  text-decoration: none;
  font-size: 1.1em;
  
  a {
    line-height: 55px;
    padding: 0;
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: #aaa;
    }
  }
`;

export const XSNavItem = styled(Nav.Link)`
  display: none !important;

  @media (max-width: 767px) {
    display: block !important;
  }
`;

export const VisibleNavitem = styled(NavItem)`
  line-height: 20px;
  margin-left: 30px;
  padding-top: 0;
  text-decoration: none;
  font-size: 1.1em;
  a {
    line-height: 55px;
    padding: 0;
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: #aaa;
    }
  }
`;

export const NavLi = styled.li`
  font-size: 1.1em;
  margin-left: 0;
  line-height: 20px;
  margin-left: 30px;
  padding-top: 0;
  text-decoration: none;
  a {
    line-height: 55px;
    padding: 0;
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: #aaa;
    }
  }

  @media (max-width: 767px) {
      display: none !important;
  }
`;