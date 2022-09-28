import styled from 'styled-components';
import { Nav, NavItem } from 'react-bootstrap';

export const NavBar = styled(Nav)`
  margin-right: 15px;
`;

export const Navitem = styled(NavItem)`
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

export const XSNavItem = styled(Navitem)`
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